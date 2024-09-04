import { useEffect, useState } from "react";
import Header from "./Header";
import Lodging from "./Lodging";
import ItineraryMain from "./ItineraryMain";
import Budget from "./Budget";
import About from "./About";
import Explore from "./Explore";

function Itinerary() {
  const [fetchedData, setFetchedData] = useState({});
  const [currentPage, setCurrentPage] = useState("Itinerary");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = localStorage.getItem('itineraryData');
        if (response) {
          const data = JSON.parse(response);
          setFetchedData(data);
        } else {
          throw new Error('No itinerary data found in local storage');
        }
      } catch (error) {
        console.log("Failed to fetch description:", error);
      }
    };
  
    fetchData();
  }, []);
  

  const renderContent = () => {
    switch (currentPage) {
      case "About":
        return <About location={fetchedData.location} intro={fetchedData.location_intro} emergency={fetchedData.emergency_numbers} index={fetchedData.life_quality_index} />;
      case "Explore":
        return <Explore location={fetchedData.location} intro={fetchedData.location_intro} activities={fetchedData.recommended_activities} />;
      case "Itinerary":
      default:
        return (
          <>
            <Description intro={fetchedData.introduction} trip={fetchedData.trip_intro} />
            <div className="flex justify-between">
              <ItineraryMain data={fetchedData.itinerary} />
              <div>
                <Lodging data={fetchedData.hotels} type="stay" />
                <Lodging data={fetchedData.restaurants} type="food" />
                <Budget data={fetchedData.expenses} />
                <div className="mb-8">
                  <h3>Map</h3>
                  <img src="https://placehold.co/600x200" alt="Placeholder Map" />
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="w-11/12 mx-auto">
      <Header location={fetchedData.location} date={fetchedData.trip_date} people={fetchedData.people} />
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderContent()}
    </div>
  );
}

function Navigation({ currentPage, setCurrentPage }) {
  const pages = ["About", "Itinerary", "Explore"];

  return (
    <div className="w-fit px-4 py-2 rounded-full bg-black flex mx-auto">
      {pages.map((page) => (
        <span
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`text-xl mx-2 px-4 py-2 cursor-pointer rounded-full ${currentPage === page ? "bg-white text-black" : "text-white"
            }`}
          role="button"
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </span>
      ))}
    </div>
  );
}

function Description({ intro, trip }) {
  return (
    <div className="my-8">
      <h1 className="font-bold text-4xl mb-4">{trip}</h1>
      <p className="text-lg leading-relaxed">{intro}</p>
    </div>
  );
}





export default Itinerary;
