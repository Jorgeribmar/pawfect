import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardActions, 
  Avatar, 
  IconButton, 
  Typography,
  Box
} from '@mui/material';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { Post } from '../../types';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card sx={{ maxWidth: '100%', mb: 2 }}>
      <CardHeader
        avatar={
          <Avatar src={post.user.avatar} alt={post.user.name} />
        }
        title={post.user.name}
        subheader={format(new Date(post.createdAt), 'MMM d, yyyy')}
      />
      
      {post.images.length > 0 && (
        <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
          <img
            src={post.images[0]}
            alt="Post content"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
      )}

      <CardContent>
        <Typography variant="body1">{post.content}</Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="like">
          <Heart />
        </IconButton>
        <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
          {post.likes}
        </Typography>
        
        <IconButton aria-label="comment">
          <MessageCircle />
        </IconButton>
        <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
          {post.comments.length}
        </Typography>

        <IconButton aria-label="share">
          <Share2 />
        </IconButton>
      </CardActions>
    </Card>
  );
};