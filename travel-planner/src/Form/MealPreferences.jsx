import FormHeading from "./FormHeading";
import Categories from "./Categories";

function MealPreferences({
    budget,
    setBudget,
    foodCategories,
    setFoodCategories,
    foodLabels,
    setFoodLabels,
  }) {
    return (
      <div className="mb-10">
        <FormHeading
          title="Meal Preferences"
          content="Pick the dishes you feel like having on your journey, let us know your budget, and tell us what type of cuisine you prefer."
        />
  
        <Categories
          type="budget"
          selectedCategory={budget}
          setSelectedCategory={setBudget}
        />
  
        <Categories
          type="foodCategories"
          selectedCategory={foodCategories}
          setSelectedCategory={setFoodCategories}
        />
  
        <Categories
          type="foodLabels"
          selectedCategories={foodLabels}
          setSelectedCategories={setFoodLabels}
        />
      </div>
    );
  }

  export default MealPreferences