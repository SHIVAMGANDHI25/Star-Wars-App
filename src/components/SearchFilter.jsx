import React, { useState } from 'react';

const SearchFilter = ({ onSearch, onFilter, filters }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Characters
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Homeworld
          </label>
          <select
            value={filters.homeworld}
            onChange={(e) => onFilter('homeworld', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">All Homeworlds</option>
            <option value="https://swapi.dev/api/planets/1/">Tatooine</option>
            <option value="https://swapi.dev/api/planets/2/">Alderaan</option>
            <option value="https://swapi.dev/api/planets/8/">Naboo</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Film
          </label>
          <select
            value={filters.film}
            onChange={(e) => onFilter('film', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">All Films</option>
            <option value="https://swapi.dev/api/films/1/">A New Hope</option>
            <option value="https://swapi.dev/api/films/2/">The Empire Strikes Back</option>
            <option value="https://swapi.dev/api/films/3/">Return of the Jedi</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Species
          </label>
          <select
            value={filters.species}
            onChange={(e) => onFilter('species', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">All Species</option>
            <option value="https://swapi.dev/api/species/1/">Human</option>
            <option value="https://swapi.dev/api/species/2/">Droid</option>
            <option value="https://swapi.dev/api/species/3/">Wookiee</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
