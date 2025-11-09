import React, { useState, useEffect } from 'react';
import { fetchPlanet } from '../utils/api';
import { formatDate, convertHeight } from '../utils/helpers';

const CharacterModal = ({ character, onClose }) => {
  const [planetData, setPlanetData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlanetData = async () => {
      try {
        const data = await fetchPlanet(character.homeworld);
        setPlanetData(data);
      } catch (err) {
        console.error('Failed to load planet data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadPlanetData();
  }, [character.homeworld]);

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      onClick={onClose}
      data-testid="character-modal"
    >
      <div 
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold" data-testid="character-name">{character.name}</h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Height</p>
              <p className="text-2xl font-bold text-blue-700" data-testid="character-height">
                {convertHeight(character.height)} m
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Mass</p>
              <p className="text-2xl font-bold text-purple-700" data-testid="character-mass">
                {character.mass} kg
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Birth Year</p>
              <p className="text-2xl font-bold text-green-700">
                {character.birth_year}
              </p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Films Appeared</p>
              <p className="text-2xl font-bold text-orange-700" data-testid="character-films">
                {character.films.length}
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Date Added</p>
            <p className="text-lg font-semibold text-gray-800">
              {formatDate(character.created)}
            </p>
          </div>
          
          {loading ? (
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
                <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          ) : planetData ? (
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Homeworld Details</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Name:</span>
                  <span className="text-gray-900" data-testid="homeworld-name">{planetData.name}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Terrain:</span>
                  <span className="text-gray-900">{planetData.terrain}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Climate:</span>
                  <span className="text-gray-900">{planetData.climate}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Population:</span>
                  <span className="text-gray-900">
                    {planetData.population === 'unknown' 
                      ? 'Unknown' 
                      : parseInt(planetData.population).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-red-700">Failed to load homeworld data</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;
