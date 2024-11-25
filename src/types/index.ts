export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  pets: Pet[];
  createdAt: string;
}

export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  photo: string;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  content: string;
  images: string[];
  likes: number;
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  user: User;
  content: string;
  createdAt: string;
}

export interface FilterOptions {
  timeRange: 'all' | 'today' | 'week' | 'month';
  sortBy: 'recent' | 'likes' | 'comments';
  tag: string;
}