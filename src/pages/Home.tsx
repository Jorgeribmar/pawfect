import React from 'react';
import { Container, Typography, Box, Alert, Divider, Button, CircularProgress } from '@mui/material';
import { RefreshCw } from 'lucide-react';
import { PostCard } from '../components/Post/PostCard';
import { SearchBar } from '../components/Search/SearchBar';
import { SearchFilters } from '../components/Search/SearchFilters';
import { useSearch } from '../hooks/useSearch';
import { useFilteredPosts } from '../hooks/useFilteredPosts';
import { useUrlFilters } from '../hooks/useUrlFilters';
import { usePosts } from '../hooks/usePosts';

export const Home = () => {
  const {
    filters,
    searchQuery,
    updateFilters,
    updateSearch,
    clearFilters,
  } = useUrlFilters();

  const { data: posts, isLoading, isError } = usePosts();

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="md" sx={{ mt: 10 }}>
        <Alert severity="error">Failed to load posts. Please try again later.</Alert>
      </Container>
    );
  }

  // First apply search
  const searchResults = useSearch(posts || [], searchQuery);
  
  // Then apply filters to search results
  const filteredPosts = useFilteredPosts(searchResults, filters);

  const hasActiveFilters = filters.timeRange !== 'all' || 
    filters.sortBy !== 'recent' || 
    filters.tag !== '' || 
    searchQuery !== '';

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Latest Posts
        </Typography>
        
        <SearchBar
          value={searchQuery}
          onChange={updateSearch}
          onClear={() => updateSearch('')}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <SearchFilters 
            filters={filters}
            onFilterChange={updateFilters}
          />
          
          {hasActiveFilters && (
            <Button
              startIcon={<RefreshCw size={16} />}
              onClick={clearFilters}
              size="small"
              sx={{ ml: 'auto' }}
            >
              Clear Filters
            </Button>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        {hasActiveFilters && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Found {filteredPosts.length} results
              {searchQuery && ` for "${searchQuery}"`}
              {filters.tag && ` in ${filters.tag}`}
            </Typography>
          </Box>
        )}

        {filteredPosts.length === 0 && (
          <Alert severity="info" sx={{ mb: 2 }}>
            No posts found matching your criteria. Try adjusting your filters or search terms.
          </Alert>
        )}
      </Box>
      
      {filteredPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Container>
  );
};