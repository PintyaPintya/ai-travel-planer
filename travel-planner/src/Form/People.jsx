function People({ people, setPeople }) {
  return (
    <div className="flex justify-between items-center mb-10">
      <label htmlFor="people" className="text-2xl font-medium nakli-black">
        How many individuals are attending?
      </label>
      <select
        id="people"
        value={people}
        onChange={(e) => setPeople(e.target.value)}
        className="bg-white w-44 border rounded-xl py-3 px-4"
        required
      >
        <option value="">Select People</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
    </div>
  );
}

export default People;
