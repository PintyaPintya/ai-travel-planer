import { useEffect, useState } from "react";
import Header from "./Header";

function Itinerary() {
  const [fetchedData, setFetchedData] = useState({});
  const [currentPage, setCurrentPage] = useState("Itinerary");

  useEffect(() => {
    const fetchData = async() => {
      try{
        const response = await fetch("/temp.json");
        const data = await response.json();
        setFetchedData(data)
      } catch(error){
        console.log("Failed to fetch description:", error)
      }
    }
    fetchData();
  },[]);

  return (
    <div className="w-5/6 mx-auto">
      <Header />
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <Description data={fetchedData.introduction} />
    </div>
  );
}

function Navigation({ currentPage, setCurrentPage }) {
  const pages = ["About", "Itinerary", "Explore"];

  return (
    <div className="w-fit px-4 py-2 rounded-full bg-black flex">
      {pages.map((page) => (
        <span
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`text-xl mx-2 px-4 py-2 cursor-pointer rounded-full ${
            currentPage === page ? "bg-white text-black" : "text-white"
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


function Description({data}){
  
  return(
    <div>
      <h1 className="font-bold text-3xl">Your trip to Goa for 5 days</h1>
      <p className="text-xl">{data}</p>
    </div>
  )
}
 
export default Itinerary;
