import React, { useState } from 'react';
import { useCharacters } from './hooks/useCharacters';
import { useAuth } from './hooks/useAuth';
import CharacterCard from './components/CharacterCard';
import CharacterModal from './components/CharacterModal';
import Pagination from './components/Pagination';
import SearchFilter from './components/SearchFilter';
import Login from './components/Login';

function App() {
  const { authenticated, loading: authLoading, login, logout } = useAuth();
  const {
    characters,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    handleSearch,
    handleFilter,
    filters
  } = useCharacters();
  
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (!authenticated) {
    return <Login onLogin={login} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-1">Star Wars Characters</h1>
              <p className="text-blue-100">Explore the Galaxy Far, Far Away</p>
            </div>
            <button
              onClick={logout}
              className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <SearchFilter 
          onSearch={handleSearch}
          onFilter={handleFilter}
          filters={filters}
        />

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading characters...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2">Error Loading Characters</h3>
            <p>{error}</p>
          </div>
        ) : characters.length === 0 ? (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-6 rounded-lg shadow-md text-center">
            <p className="text-lg font-semibold">No characters found</p>
            <p className="text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {characters.map((character, index) => (
                <CharacterCard
                  key={`${character.name}-${index}`}
                  character={character}
                  onClick={setSelectedCharacter}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </main>

      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </div>
  );
}

export default App;
