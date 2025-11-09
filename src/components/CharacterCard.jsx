import React from 'react';
import { getRandomImage, getSpeciesColor } from '../utils/helpers';

const CharacterCard = ({ character, onClick }) => {
  const colorClass = getSpeciesColor(character.speciesName);
  
  return (
    <div
      onClick={() => onClick(character)}
      className={`${colorClass} border-2 rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={getRandomImage(character.name)}
          alt={character.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 className="text-white text-xl font-bold">{character.name}</h3>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-gray-700">Species:</span>
          <span className="text-gray-600">{character.speciesName}</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="font-semibold text-gray-700">Films:</span>
          <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
            {character.films.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
