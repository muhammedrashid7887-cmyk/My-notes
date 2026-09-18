import React, { useEffect, useState } from 'react';
import AddNote from './components/AddNote';
import StoreNote from './components/StoreNote';
import Search from './components/Search';

function App() {

  const [result, setResult] = useState([]);
  const [search, setSearch] = useState("");

  // Get notes from Local Storage
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");

    if (savedNotes) {
      setResult(JSON.parse(savedNotes));
    }
  }, []);

  // Add Note
  const handleAdd = (title, dis) => {

    const newResult = [...result, { title, dis }];

    setResult(newResult);

    localStorage.setItem(
      "notes",
      JSON.stringify(newResult)
    );
  };

  // Remove Note
  const handleRemove = (index) => {

    const newResult = result.filter((_, i) => i !== index);

    setResult(newResult);

    localStorage.setItem(
      "notes",
      JSON.stringify(newResult)
    );
  };

  // Search
  const filteredResult = result.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">

      {/* Search */}
      <Search
        search={search}
        setSearch={setSearch}
      />

      {/* Add box hide when searching */}
      {search === "" && (
        <AddNote handleAdd={handleAdd} />
      )}

      {/* Notes */}
      <StoreNote
        result={filteredResult}
        handleRemove={handleRemove}
      />

    </div>
  );
}

export default App;