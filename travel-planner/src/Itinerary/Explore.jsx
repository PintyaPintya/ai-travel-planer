
function Explore({ location, intro, activities }) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">About {location}</h1>
      <p className="text-xl mb-8">{intro}</p>
      <div className="flex flex-wrap justify-between">
        {activities.map((hotel, index) => (
          <Activity key={index} data={hotel} />
        ))}
      </div>
    </div>
  );
}

function Activity({ data }) {
  return (
    <div className="max-w-xs mb-6">
      <img src={data.image} alt={data.name} />
      <h4 className="text-xl font-medium">{data.name}</h4>
      <p>{data.description}</p>
      <p>Rating: {data.rating}</p>
    </div>
  );
}

export default Explore;
