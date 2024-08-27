function Categories({
  type,
  selectedCategory,
  setSelectedCategory,
  selectedCategories,
  setSelectedCategories,
}) {
  let typeOfCategories = [];
  if (type === "travellingWith") {
    typeOfCategories = ["Solo", "Couple", "Friends", "Family"];
  } else if (type === "targeting") {
    typeOfCategories = [
      "Night Out",
      "Shopping",
      "Food",
      "Festivals",
      "Beach",
      "Explore City",
      "Spa",
      "Outdoor",
    ];
  } else if (type === "foodCategories") {
    typeOfCategories = ["Veg", "Non-Veg", "Both"];
  } else if (type === "foodLabels") {
    typeOfCategories = ["Organic", "Dietary", "Authentic", "Vegan"];
  } else if (type === "budget") {
    typeOfCategories = ["Economy", "Standard", "Premium"];
  }

  let headingText = "";
  if (type === "travellingWith") {
    headingText = "Who are you travelling with?";
  } else if (type === "targeting") {
    headingText = "What are the key individuals you're targeting?";
  } else if (type === "foodCategories") {
    headingText = "What kind of food do you like the best?";
  } else if (type === "foodLabels") {
    headingText = "What kind of food do you usually go for?";
  } else if (type === "budget") {
    headingText = "What is your budget?";
  }

  const handleCategoryClick = (category) => {
    if (
      type === "travellingWith" ||
      type === "budget" ||
      type === "foodCategories"
    ) {
      setSelectedCategory(category);
    } else {
      setSelectedCategories((prevSelected) =>
        prevSelected.includes(category)
          ? prevSelected.filter((item) => item !== category)
          : [...prevSelected, category]
      );
    }
  };

  return (
    <div className="mb-10">
      <p className="text-2xl font-medium text-black mb-5">{headingText}</p>
      <div className="flex flex-wrap gap-4 justify-center">
        {typeOfCategories.map((category) => (
          <Category
            key={category}
            title={category}
            isSelected={
              type === "travellingWith"
                ? selectedCategory === category
                : type === "budget" || type === "foodCategories"
                ? selectedCategory === category
                : selectedCategories.includes(category)
            }
            onClick={() => handleCategoryClick(category)}
          />
        ))}
      </div>
    </div>
  );
}

function Category({ title, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`border rounded-lg py-4 px-10 flex-1 ${
        isSelected ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {title}
    </button>
  );
}

export default Categories