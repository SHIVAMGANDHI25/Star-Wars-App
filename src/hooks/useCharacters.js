import { useState, useEffect, useCallback } from 'react';
import { fetchPeople, searchCharacters, fetchSpecies } from '../utils/api';

export const useCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    homeworld: '',
    film: '',
    species: ''
  });

  const loadCharacters = useCallback(async (page, query = '') => {
    setLoading(true);
    setError(null);
    
    try {
      let data;
      if (query) {
        data = await searchCharacters(query);
      } else {
        data = await fetchPeople(page);
      }
      
      // Fetch species data for color coding
      const charactersWithSpecies = await Promise.all(
        data.results.map(async (character) => {
          if (character.species && character.species.length > 0) {
            try {
              const speciesData = await fetchSpecies(character.species[0]);
              return { ...character, speciesName: speciesData.name };
            } catch (err) {
              return { ...character, speciesName: 'Unknown' };
            }
          }
          return { ...character, speciesName: 'Human' };
        })
      );
      
      setCharacters(charactersWithSpecies);
      setTotalPages(Math.ceil(data.count / 10));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCharacters(currentPage, searchQuery);
  }, [currentPage, searchQuery, loadCharacters]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilter = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const filteredCharacters = characters.filter(character => {
    if (filters.homeworld && character.homeworld !== filters.homeworld) {
      return false;
    }
    if (filters.film && !character.films.includes(filters.film)) {
      return false;
    }
    if (filters.species && character.species[0] !== filters.species) {
      return false;
    }
    return true;
  });

  return {
    characters: filteredCharacters,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    handleSearch,
    handleFilter,
    filters
  };
};
