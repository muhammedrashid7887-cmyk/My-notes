import React, { useState } from 'react';

function AddNote(props) {

  const [title, setTitle] = useState("");
  const [dis, setDis] = useState("");

  const handle = () => {
      if (title.trim() === "" || dis.trim() === "") {
    return;
  }
    props.handleAdd(title, dis);
    setTitle("");
    setDis("");
  };

  return (
    <div className="max-w-2xl mt-1 mx-auto">

      <div className="bg-white rounded-2xl shadow-md p-6">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          My Notebook
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handle();
          }}
          className="space-y-5"
        >

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Title :
            </label>

            <input
              type="text"
              placeholder="Enter title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Description :
            </label>

            <textarea
              value={dis}
              placeholder="Add some details about your note..."
              onChange={(e) => setDis(e.target.value)}
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg resize-none outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Add
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddNote;