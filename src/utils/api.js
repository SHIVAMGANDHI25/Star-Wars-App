const BASE_URL = 'https://swapi.dev/api';

export const fetchPeople = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/people/?page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }
  return response.json();
};

export const fetchPlanet = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch planet data');
  }
  return response.json();
};

export const fetchSpecies = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch species data');
  }
  return response.json();
};

export const searchCharacters = async (query) => {
  const response = await fetch(`${BASE_URL}/people/?search=${query}`);
  if (!response.ok) {
    throw new Error('Failed to search characters');
  }
  return response.json();
};
