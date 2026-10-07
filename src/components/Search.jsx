import React from 'react';
import { useNotes } from '../contexts/NotesContext';

function Search(props) {
  const { searchNotes, searchQuery } = useNotes();
  const searchVal = props.search !== undefined ? props.search : (searchQuery || "");

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (props.setSearch) {
      props.setSearch(val);
    }
    searchNotes(val);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchNotes(searchVal);
  };

  return (
    <div className="flex gap-3 justify-center mb-8">
      <input
        type="search"
        value={searchVal}
        onChange={handleInputChange}
        placeholder="Searching..."
        className="border-2 p-3 w-80 h-10 rounded-3xl"
      />

      <button
        type="button"
        onClick={handleSearchSubmit}
        className="bg-blue-400 px-6 hover:bg-amber-600 rounded-3xl"
      >
        Search
      </button>
    </div>
  );
}

export default Search;