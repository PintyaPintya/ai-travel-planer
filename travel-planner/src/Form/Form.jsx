import { useState } from "react";
import FormHeading from "./FormHeading";
import Destination from "./Destination";
import DateComponent from "./DateComponent";
import People from "./People";
import Days from "./Days";
import Categories from "./Categories";
import MealPreferences from "./MealPreferences";

function Form() {
  
  const getFormattedDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [destination, setDestination] = useState("");
  const [selectDate, setSelectDate] = useState(getFormattedDate());
  const [people, setPeople] = useState("");
  const [days, setDays] = useState(1);
  const [travellingWith, setTravellingWith] = useState(null);
  const [targeting, setTargeting] = useState([]);
  const [budget, setBudget] = useState(null); 
  const [foodCategories, setFoodCategories] = useState(null); 
  const [foodLabels, setFoodLabels] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);

  const validateForm = () => {
    if (currentStep === 1) {
      return (
        destination &&
        selectDate &&
        people &&
        days > 0 &&
        travellingWith &&
        targeting.length > 0
      );
    } else if (currentStep === 2) {
      return (
        budget !== null && 
        foodCategories !== null && 
        foodLabels.length > 0
      );
    }
    return true;
  };

  const handleNext = () => {
    if (!validateForm()) {
      alert("Please fill in all required fields.");
      return;
    }

    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      const formData = {
        destination,
        date: selectDate,
        people,
        days,
        travellingWith,
        targeting,
        mealPreferences: {
          budget,
          foodCategories,
          foodLabels,
        },
      };
      console.log("Form Data:", JSON.stringify(formData));
      // Here you can send the formData to your server or API
      // For example:
      // fetch('/your-endpoint', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
    }
  };

  return (
    <div className="container mb-10">
      {currentStep === 1 && (
        <>
          <FormHeading
            title="Lets plan your trip!"
            content="Simply share a few details, and our planner will create a personalized itinerary tailored to your preferences."
            className="w-5/6"
          />
          <Destination
            destination={destination}
            setDestination={setDestination}
          />
          <DateComponent
            selectDate={selectDate}
            setSelectDate={setSelectDate}
          />
          <People people={people} setPeople={setPeople} />
          <Days days={days} setDays={setDays} />
          <Categories
            type="travellingWith"
            selectedCategory={travellingWith}
            setSelectedCategory={setTravellingWith}
          />
          <Categories
            type="targeting"
            selectedCategories={targeting}
            setSelectedCategories={setTargeting}
          />
        </>
      )}
      {currentStep === 2 && (
        <MealPreferences
          budget={budget}
          setBudget={setBudget}
          foodCategories={foodCategories}
          setFoodCategories={setFoodCategories}
          foodLabels={foodLabels}
          setFoodLabels={setFoodLabels}
        />
      )}
      <div className="flex justify-center">
        <button
          onClick={handleNext}
          className="w-3/4 h-14 text-center text-white bg-black border border-black rounded-xl"
        >
          {currentStep === 1 ? "Next" : "Generate Itinerary"}
        </button>
      </div>
    </div>
  );
}

export default Form;
