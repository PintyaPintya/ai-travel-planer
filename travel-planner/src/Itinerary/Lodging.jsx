import { useState } from "react";

function Lodging({ data, type }) {
  const hotels = data ? Object.values(data) : [];
  const [startIndex, setStartIndex] = useState(0);

  const itemsToShow = 2;
  const endIndex = Math.min(startIndex + itemsToShow, hotels.length);
  const visibleHotels = hotels.slice(startIndex, endIndex);

  const handleLeftClick = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - itemsToShow, 0));
  };

  const handleRightClick = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + itemsToShow, hotels.length - itemsToShow)
    );
  };

  const isLeftButtonDisabled = startIndex === 0;
  const isRightButtonDisabled = endIndex >= hotels.length;

  return (
    <div className="w-full mb-8">
      <h3 className="text-3xl font-medium">{type==="stay" ? "Place to stay" : "Suggested Restaurants"}</h3>
      <p className="text-xl font-medium">
        {type === "stay" ? "We've also recommended some places to stay during your trip." : "We've also recommended some places to eat during your trip."}        
      </p>
      <div className="relative w-full flex items-center">
        <button
          className={`absolute left-0 px-4 py-2 rounded-full ${
            isLeftButtonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-800 text-white"
          }`}
          onClick={handleLeftClick}
          disabled={isLeftButtonDisabled}
        >
          &lt;
        </button>
        <div className="flex w-full justify-around overflow-x-auto scroll-smooth">
          {visibleHotels.length ? (
            visibleHotels.map((hotel) => (
              <div
                key={hotel.name}
                className="flex-shrink-0 w-1/2 max-w-xs p-2"
              >
                <Hotel data={hotel} />
              </div>
            ))
          ) : (
            <p>Fetching hotels, please wait...</p>
          )}
        </div>
        <button
          className={`absolute right-0 px-4 py-2 rounded-full ${
            isRightButtonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-800 text-white"
          }`}
          onClick={handleRightClick}
          disabled={isRightButtonDisabled}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

function Hotel({ data }) {
  return (
    <div className="max-w-xs">
      <img src={data.image} alt={data.name} />
      <h4 className="text-xl font-medium">{data.name}</h4>
      <p>{data.description}</p>
      <p>Rating: {data.rating}</p>
    </div>
  );
}

export default Lodging;
