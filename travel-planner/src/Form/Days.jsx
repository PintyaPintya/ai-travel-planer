function Days({ days, setDays }) {
  const increment = () => {
    setDays(days + 1);
  };

  const decrement = () => {
    if (days > 1) {
      setDays(days - 1);
    }
  };

  return (
    <div className="flex justify-between items-center mb-10">
      <label htmlFor="days" className="block text-2xl font-medium text-black">
        How many days are you planning for?
      </label>
      <div className="flex items-center justify-center border border-gray-300 rounded-xl bg-white p-2">
        <button
          onClick={decrement}
          className={`bg-black text-white border border-black rounded-full w-10 h-10 flex items-center justify-center text-lg cursor-pointer ${
            days === 1 ? "opacity-50" : ""
          }`}
          disabled={days === 1}
        >
          −
        </button>
        <div className="flex flex-col items-center justify-center border border-white rounded p-1 bg-white relative w-16 h-16 mx-2 overflow-hidden">
          <div className="flex flex-col items-center absolute top-1/2 transform -translate-y-1/2">
            <span
              className={`text-xl w-16 text-center transition-colors duration-300 ${
                days === 1 ? "text-white opacity-50" : "text-gray-400"
              }`}
              style={{ position: "relative", top: "-10%" }}
            >
              {days - 1}
            </span>
            <span className="text-xl w-16 text-center font-bold text-gray-800">
              {days}
            </span>
            <span
              className="text-xl w-16 text-center text-gray-400"
              style={{ position: "relative", top: "10%" }}
            >
              {days + 1}
            </span>
          </div>
        </div>
        <button
          onClick={increment}
          className="bg-black text-white border border-black rounded-full w-10 h-10 flex items-center justify-center text-lg cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Days;
