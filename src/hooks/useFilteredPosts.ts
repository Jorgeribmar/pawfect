import { useMemo } from 'react';
import { Post, FilterOptions } from '../types';
import { subDays, isWithinInterval, startOfDay, endOfDay, startOfWeek, startOfMonth } from 'date-fns';

export const useFilteredPosts = (posts: Post[], filters: FilterOptions) => {
  return useMemo(() => {
    let filteredPosts = [...posts];

    // Apply time range filter
    if (filters.timeRange !== 'all') {
      const now = new Date();
      const intervals: Record<string, { start: Date; end: Date }> = {
        today: {
          start: startOfDay(now),
          end: endOfDay(now),
        },
        week: {
          start: startOfWeek(now),
          end: now,
        },
        month: {
          start: startOfMonth(now),
          end: now,
        },
      };

      if (intervals[filters.timeRange]) {
        filteredPosts = filteredPosts.filter((post) => {
          const postDate = new Date(post.createdAt);
          return isWithinInterval(postDate, intervals[filters.timeRange]);
        });
      }
    }

    // Apply tag filter
    if (filters.tag) {
      filteredPosts = filteredPosts.filter((post) =>
        post.content.toLowerCase().includes(filters.tag.toLowerCase())
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'likes':
        filteredPosts.sort((a, b) => b.likes - a.likes);
        break;
      case 'comments':
        filteredPosts.sort((a, b) => b.comments.length - a.comments.length);
        break;
      case 'recent':
      default:
        filteredPosts.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    return filteredPosts;
  }, [posts, filters]);
};