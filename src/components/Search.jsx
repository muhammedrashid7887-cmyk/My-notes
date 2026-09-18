import React from 'react';

function Search(props) {

  return (
    <div className="flex gap-3 justify-center mb-8">

      <input
        type="search"
        value={props.search}
        onChange={(e) => props.setSearch(e.target.value)}
        placeholder="Searching..."
        className="border-2 p-3 w-80 h-10 rounded-3xl"
      />

      <button
        className="bg-blue-400 px-6 hover:bg-amber-600 rounded-3xl"
      >
        Search
      </button>

    </div>
  );
}

export default Search;