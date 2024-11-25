import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import queryString from 'query-string';
import { FilterOptions } from '../types';

const defaultFilters: FilterOptions = {
  timeRange: 'all',
  sortBy: 'recent',
  tag: '',
};

export const useUrlFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: FilterOptions = {
    timeRange: (searchParams.get('timeRange') as FilterOptions['timeRange']) || defaultFilters.timeRange,
    sortBy: (searchParams.get('sortBy') as FilterOptions['sortBy']) || defaultFilters.sortBy,
    tag: searchParams.get('tag') || defaultFilters.tag,
  };

  const searchQuery = searchParams.get('q') || '';

  const updateFilters = useCallback((newFilters: FilterOptions) => {
    const params = queryString.stringify(
      { ...newFilters, q: searchQuery },
      { skipEmptyString: true, skipNull: true }
    );
    setSearchParams(params);
  }, [searchQuery, setSearchParams]);

  const updateSearch = useCallback((query: string) => {
    const params = queryString.stringify(
      { ...filters, q: query },
      { skipEmptyString: true, skipNull: true }
    );
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const clearFilters = useCallback(() => {
    setSearchParams(searchQuery ? { q: searchQuery } : {});
  }, [searchQuery, setSearchParams]);

  return {
    filters,
    searchQuery,
    updateFilters,
    updateSearch,
    clearFilters,
  };
};