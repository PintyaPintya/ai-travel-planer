function Destination({ destination, setDestination }) {
  const handleChange = (event) => {
    setDestination(event.target.value);
  };

  return (
    <div>
      <label
        htmlFor="destination"
        className="block text-2xl font-medium nakli-black mb-5"
      >
        Where is your destination today?
      </label>
      <input
        type="text"
        id="destination"
        value={destination}
        onChange={handleChange}
        placeholder="Search for your destination"
        className="border w-full py-4 px-6 rounded-xl mb-10"
        required
      />
    </div>
  );
}

export default Destination;
