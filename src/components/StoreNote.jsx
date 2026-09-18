import React from 'react';

function StoreNote(props) {

  return (
    <div className="max-w-6xl mt-10 mx-auto">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {props.result.map((note, index) => {

          return (
            <div
              key={index}
              className="bg-red-200 rounded-xl shadow-md p-5 border border-gray-200"
            >

              <h3 className="text-sm font-semibold text-blue-600 mb-3">
                Note {index + 1}
              </h3>

              <h2 className="text-xl font-bold bg-yellow-100 border p-2 rounded-lg text-center text-gray-800 mb-2">
                {note.title}
              </h2>

              <p className="text-gray-600 bg-blue-300 border p-2 rounded-lg text-center leading-relaxed">
                {note.dis}
              </p>

              <button
                onClick={() => props.handleRemove(index)}
                className="bg-black ml-55 mt-5 text-white px-4 py-2 rounded"
              >
                Remove
              </button>

            </div>
          );

        })}

      </div>

    </div>
  );
}

export default StoreNote;