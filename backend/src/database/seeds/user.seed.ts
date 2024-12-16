import { User } from '../../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

export const userSeeds = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    bio: 'Professional dog trainer with 10+ years experience',
  },
  {
    id: '2',
    name: 'Mike Wilson',
    email: 'mike@example.com',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    bio: 'Certified animal behaviorist',
  },
];