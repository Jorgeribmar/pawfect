import { useMemo } from 'react';
import { Post } from '../types';

export const useSearch = (posts: Post[], searchQuery: string) => {
  return useMemo(() => {
    if (!searchQuery.trim()) {
      return posts;
    }

    const query = searchQuery.toLowerCase();
    
    return posts.filter((post) => {
      const matchesContent = post.content.toLowerCase().includes(query);
      const matchesUser = post.user.name.toLowerCase().includes(query);
      const matchesBio = post.user.bio.toLowerCase().includes(query);
      
      // Check if any of the user's pets match the search
      const matchesPets = post.user.pets.some(
        (pet) => 
          pet.name.toLowerCase().includes(query) || 
          pet.breed.toLowerCase().includes(query)
      );

      return matchesContent || matchesUser || matchesBio || matchesPets;
    });
  }, [posts, searchQuery]);
};