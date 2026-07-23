import React from "react";

const Loader = () => {
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 flex-col">
        <div className="w-20 h-28 bg-yellow-500 rounded-full animate-bounceEgg"></div>
        <h1>Loading... </h1>
      </div>
    </div>
  );
};

export default Loader;
