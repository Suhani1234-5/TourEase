import React from "react";

const MyTrips = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">My Trips</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-600">
          You haven't planned any trips yet.
        </p>

        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Plan a New Trip
        </button>
      </div>
    </div>
  );
};

export default MyTrips;