import { useQuery } from '@tanstack/react-query';
import { Post } from '../types';

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch('/api/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const usePosts = () => {
  return useQuery<Post[], Error>({ queryKey: ['posts'], queryFn: fetchPosts });
};