import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';

interface AuthenticatedSocket extends Socket {
    userId?: string;
}

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private logger = new Logger('WebsocketGateway');
    private userSockets = new Map<string, string>();

    constructor(private jwtService: JwtService) { }

    async handleConnection(client: AuthenticatedSocket) {
        try {
            const token = client.handshake.auth.token?.split(' ')[1];
            if (!token) {
                client.disconnect();
                return;
            }

            const payload = this.jwtService.verify(token);
            if (typeof payload.sub === 'string') {
                client.userId = payload.sub as string;
                this.userSockets.set(client.userId, client.id);
            } else {
                throw new Error('Invalid token payload: sub is missing or not a string');
            }

            this.logger.log(`Client connected: ${client.id}`);

            // Join user-specific room
            client.join(`user-${client.userId}`);
        } catch (error) {
            this.logger.error(`Connection error: ${error.message}`);
            client.disconnect();
        }
    }

    handleDisconnect(client: AuthenticatedSocket) {
        if (client.userId) {
            this.userSockets.delete(client.userId);
        }
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    // Notify about new post
    async notifyNewPost(userId: string, post: any) {
        this.server.emit('newPost', post);
    }

    // Notify about new comment
    async notifyNewComment(postUserId: string, comment: any) {
        this.server.to(`user-${postUserId}`).emit('newComment', comment);
    }

    // Notify about new like
    async notifyNewLike(postUserId: string, data: { postId: string; userId: string }) {
        this.server.to(`user-${postUserId}`).emit('newLike', data);
    }

    // Send notification to specific user
    async sendNotification(userId: string, notification: any) {
        this.server.to(`user-${userId}`).emit('notification', notification);
    }

    @SubscribeMessage('typing')
    async handleTyping(client: AuthenticatedSocket, payload: { postId: string; isTyping: boolean }) {
        client.broadcast.emit('userTyping', {
            postId: payload.postId,
            userId: client.userId,
            isTyping: payload.isTyping,
        });
    }
}