import React from 'react';
import { Box, Chip, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { Calendar, ThumbsUp, Clock, Tag } from 'lucide-react';
import { FilterOptions } from '../../types';

interface SearchFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, onFilterChange }) => {
  const handleChange = (key: keyof FilterOptions, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <Stack direction="row" spacing={2} sx={{ mb: 3 }} flexWrap="wrap" useFlexGap>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Time</InputLabel>
        <Select
          value={filters.timeRange}
          label="Time"
          onChange={(e) => handleChange('timeRange', e.target.value)}
          startAdornment={<Clock size={16} className="mr-2" />}
        >
          <MenuItem value="all">All time</MenuItem>
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="week">This week</MenuItem>
          <MenuItem value="month">This month</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Sort by</InputLabel>
        <Select
          value={filters.sortBy}
          label="Sort by"
          onChange={(e) => handleChange('sortBy', e.target.value)}
          startAdornment={<ThumbsUp size={16} className="mr-2" />}
        >
          <MenuItem value="recent">Most recent</MenuItem>
          <MenuItem value="likes">Most liked</MenuItem>
          <MenuItem value="comments">Most commented</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {['Training', 'Behavior', 'Health', 'Nutrition'].map((tag) => (
          <Chip
            key={tag}
            label={tag}
            icon={<Tag size={16} />}
            onClick={() => handleChange('tag', tag)}
            color={filters.tag === tag ? 'primary' : 'default'}
            variant={filters.tag === tag ? 'filled' : 'outlined'}
          />
        ))}
      </Box>
    </Stack>
  );
};