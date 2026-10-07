import React, { useState } from 'react';
import { useNotes } from '../contexts/NotesContext';

function StoreNote(props) {
  const { notes: contextNotes, deleteNote, updateNote, toggleArchive } = useNotes();
  const notesToDisplay = props.result !== undefined ? props.result : contextNotes;

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDis, setEditDis] = useState("");

  const handleStartEdit = (note) => {
    setEditingId(note.id);
    setEditTitle(note.title || "");
    setEditDis(note.content || note.dis || "");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDis("");
  };

  const handleSaveEdit = async (id) => {
    if (editTitle.trim() === "" || editDis.trim() === "") {
      return;
    }
    await updateNote(id, {
      title: editTitle.trim(),
      content: editDis.trim(),
      dis: editDis.trim(),
    });
    setEditingId(null);
  };

  return (
    <div className="max-w-6xl mt-10 mx-auto">
      {notesToDisplay.length === 0 ? (
        <p className="text-center text-gray-500 my-8">No notes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {notesToDisplay.map((note, index) => {
            const isEditing = editingId === note.id;

            return (
              <div
                key={note.id || index}
                className="bg-red-200 rounded-xl shadow-md p-5 border border-gray-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-semibold text-blue-600">
                      Note {index + 1}
                    </h3>
                    {note.archived && (
                      <span className="text-xs bg-amber-600 text-white px-2 py-0.5 rounded-full font-medium">
                        Archived
                      </span>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Enter title..."
                        className="w-full bg-yellow-50 border border-yellow-300 p-2 rounded-lg text-center text-gray-800 font-bold outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <textarea
                        value={editDis}
                        onChange={(e) => setEditDis(e.target.value)}
                        placeholder="Enter details..."
                        className="w-full h-24 bg-blue-50 border border-blue-300 p-2 rounded-lg text-center text-gray-700 leading-relaxed outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      ></textarea>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold bg-yellow-100 border p-2 rounded-lg text-center text-gray-800 mb-2">
                        {note.title}
                      </h2>

                      <p className="text-gray-600 bg-blue-300 border p-2 rounded-lg text-center leading-relaxed">
                        {note.content || note.dis}
                      </p>
                    </>
                  )}
                </div>

                {isEditing ? (
                  <div className="flex justify-end gap-2 mt-5">
                    <button
                      type="button"
                      onClick={() => handleSaveEdit(note.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded font-medium text-sm transition"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded font-medium text-sm transition"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap justify-between items-center mt-5 gap-2">
                    <button
                      type="button"
                      onClick={() => toggleArchive(note.id)}
                      className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded font-medium text-sm transition"
                    >
                      {note.archived ? "Unarchive" : "Archive"}
                    </button>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(note)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded font-medium text-sm transition"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          props.handleRemove
                            ? props.handleRemove(note.id)
                            : deleteNote(note.id)
                        }
                        className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded font-medium text-sm transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default StoreNote;