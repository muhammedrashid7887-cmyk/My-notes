import React, { useState } from 'react';
import AddNote from './components/AddNote';
import StoreNote from './components/StoreNote';
import Search from './components/Search';
import { useNotes } from './contexts/NotesContext';

function App() {
  const {
    notes,
    loading,
    error,
    createNote,
    deleteNote,
    searchNotes,
  } = useNotes();

  const [search, setSearch] = useState("");

  const handleSearch = (query) => {
    setSearch(query);
    searchNotes(query);
  };

  const handleAdd = async (title, dis) => {
    await createNote({
      title,
      content: dis,
      dis,
      color: "yellow",
      tags: [],
      archived: false,
    });
  };

  const handleRemove = async (id) => {
    await deleteNote(id);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      {/* Error display */}
      {error && (
        <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
          {error}
        </div>
      )}

      {/* Search */}
      <Search
        search={search}
        setSearch={handleSearch}
      />

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      )}

      {/* Add box hide when searching */}
      {search === "" && (
        <AddNote handleAdd={handleAdd} />
      )}

      {/* Notes */}
      <StoreNote
        result={notes}
        handleRemove={handleRemove}
      />
    </div>
  );
}

export default App;