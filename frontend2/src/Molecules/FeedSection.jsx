import React, { useEffect, useState } from "react";

const FeedSection = ({ feedItems }) => {
  const [visibleItems, setVisibleItems] = useState([]);

  // Add items to the visible list one by one with a delay
  useEffect(() => {
    let timeouts = [];
    feedItems.forEach((item, index) => {
      const timeout = setTimeout(() => {
        setVisibleItems((prev) => [...prev, item]);
      }, index * 1000); // Delay each item by 1000ms for the next one
      timeouts.push(timeout); // Store timeout IDs to clear later if needed
    });

    // Clean up timeouts when the component unmounts or feedItems changes
    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [feedItems]); // Only run this effect if feedItems changes

  return (
    <div className="w-[350px] md:w-[400px] lg:w-[450px] overflow-y-auto p-6 rounded-lg shadow-2xl bg-gradient-to-br from-purple-600 via-pink-300 to-indigo-400 hover:scale-105 transition-all duration-300">
      <h3 className="text-2xl font-semibold mb-6 text-white">Trending News</h3>
      {visibleItems.map((item, index) => (
        <div
          key={item.id}
          className="bg-indigo-500  p-4 mb-6 rounded-lg shadow-lg transform transition-all duration-500 ease-out hover:bg-opacity-80 hover:scale-105"
          style={{
            opacity: 1,
            transform: `translateY(${
              index === visibleItems.length - 1 ? 0 : 10
            }px)`,
            transitionDelay: `${index * 1000}ms`, // Inline delay to stagger animations
          }}
        >
          <h4 className="font-semibold text-white text-xl">{item.title}</h4>
          <p className="text-gray-200 text-sm mt-2">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeedSection;
