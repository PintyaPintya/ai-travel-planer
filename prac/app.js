const express = require('express');
const { config } = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
config(); // Load environment variables from .env file

const PORT = process.env.PORT || 3000; // Default to port 3000 if PORT is not set

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error('GEMINI_API_KEY is not set');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

// Function to clean up the response text
const cleanResponse = (responseText) => {
    // Remove unwanted text (e.g., code blocks or extra markdown)
    const jsonText = responseText
        .replace(/```json/g, '') // Remove opening code block marker
        .replace(/```/g, '') // Remove closing code block marker
        .trim();

    return jsonText;
};

const getItinerary = async () => {
    const chatSession = model.startChat({
        generationConfig,
        history: [],
    });

    const query = `{
    "destination": "Mumbai",
    "date": "2024-09-07",
    "travel_days": 3,
    "number_of_travellers": 2,
    "travelling_with": "couple",
    "interests": ["Festivals", "Night out", "Explore City", "Outdoor"],
    "mealPreferences": {
        "budget": "Standard",
        "foodCategories": "Both",
        "foodLabels": ["Authentic"]
}}
    
    Create a detailed itinerary with at least 4-5 events per day without including time for food in key-value pair format based on the following travel details, mainly focusing on the user's interests, famous spots in the city and events happening in the city on the specified date only if they align with the user's interests. The locations can be far away but travelling should be linear or round trip. Hotel budgets must be as per meal preferences budget like Economic, Standard and Premium

Example:
{
  "background_image": "https://www.holidify.com/images/cmsuploads/2022/01/mumbai-city-skyline-at-night.jpg",
  "introduction": "Mumbai, the bustling metropolis of India, offers a vibrant blend of cultural experiences, historical landmarks, and modern attractions. This itinerary, crafted for a couple seeking a mix of festivals, shopping, spa experiences, city exploration, and outdoor activities, embraces Mumbai's vibrant spirit. It includes popular destinations like Gateway of India, Elephanta Caves, and street markets, ensuring an authentic experience. We've also incorporated a special event happening on your travel date, the Ganesh Chaturthi festival, adding a unique cultural element to your journey.",
  "itinerary": {
    "Day 1": {
      "Activities": [
        {
          "Location": "Gateway of India",
          "Description": "Start your Mumbai adventure with a visit to the iconic Gateway of India, a historic arch built in 1924. Immerse yourselves in the lively atmosphere as you admire the architectural marvel and capture stunning photos.",
          "Duration": "2 hours",
          "Travel Time": "10 minutes from the airport (depending on traffic)"
        },
        {
          "Location": "Elephanta Caves",
          "Description": "Embark on a ferry ride to the UNESCO World Heritage Site of Elephanta Caves, renowned for their intricate rock-cut Hindu sculptures. Explore the ancient cave temples and marvel at the exquisite carvings.",
          "Duration": "4 hours",
          "Travel Time": "1 hour by ferry from Gateway of India"
        },
        {
          "Location": "Mani Bhavan",
          "Description": "Journey back in time at Mani Bhavan, Mahatma Gandhi's former residence in Mumbai. Explore the museum and learn about Gandhi's life and philosophies.",
          "Duration": "2 hours",
          "Travel Time": "30 minutes from Elephanta Caves"
        },
        {
          "Location": "Dhobi Ghat",
          "Description": "Experience the unique Dhobi Ghat, an open-air laundry facility where thousands of clothes are washed daily. Witness the fascinating blend of traditional methods and modern life.",
          "Duration": "1 hour",
          "Travel Time": "15 minutes from Mani Bhavan"
        }
      ]
    },
    "Day 2": {
      "Activities": [
        {
          "Location": "Chhatrapati Shivaji Maharaj Terminus (CST)",
          "Description": "Begin your day at the magnificent Chhatrapati Shivaji Maharaj Terminus, a UNESCO World Heritage Site known for its Victorian Gothic architecture. Take a guided tour to appreciate the intricate details.",
          "Duration": "2 hours",
          "Travel Time": "15 minutes from your hotel (depending on location)"
        },
        {
          "Location": "Kanheri Caves",
          "Description": "Escape the city bustle and venture to the serene Kanheri Caves, ancient Buddhist cave temples carved into the hills. Explore the caves, admire the rock-cut architecture, and enjoy the scenic surroundings.",
          "Duration": "4 hours",
          "Travel Time": "1 hour by train from CST"
        },
        {
          "Location": "Juhu Beach",
          "Description": "Relax and unwind at the famous Juhu Beach, a popular spot for sunbathing, swimming, and enjoying street food. Stroll along the shore and witness the vibrant atmosphere.",
          "Duration": "3 hours",
          "Travel Time": "1 hour from Kanheri Caves"
        },
        {
          "Location": "Shree Siddhivinayak Temple",
          "Description": "Seek blessings at the renowned Shree Siddhivinayak Temple, a prominent Hindu temple dedicated to Lord Ganesha. Experience the spiritual aura and witness the devotional fervor.",
          "Duration": "1 hour",
          "Travel Time": "30 minutes from Juhu Beach"
        }
      ]
    },
    "Day 3": {
      "Activities": [
        {
          "Location": "Bandra-Worli Sea Link",
          "Description": "Start your day with a scenic drive on the iconic Bandra-Worli Sea Link, a stunning cable-stayed bridge offering panoramic views of the city and the Arabian Sea. Capture breathtaking photos.",
          "Duration": "1 hour",
          "Travel Time": "30 minutes from your hotel (depending on location)"
        },
        {
          "Location": "Shanti Sagar (Bandra)",
          "Description": "Enjoy a shopping spree at the famous Shanti Sagar market, a paradise for street shopping and finding unique souvenirs. Explore the colorful stalls and bargain for your finds.",
          "Duration": "3 hours",
          "Travel Time": "15 minutes from Bandra-Worli Sea Link"
        },
        {
          "Location": "Oberoi Spa (Nariman Point)",
          "Description": "Indulge in a rejuvenating spa experience at the luxurious Oberoi Spa. Relax with a massage or a body treatment to unwind and restore your energy.",
          "Duration": "2 hours",
          "Travel Time": "45 minutes from Shanti Sagar"
        },
        {
          "Location": "Marine Drive",
          "Description": "End your Mumbai adventure with a romantic stroll along Marine Drive, known as the 'Queen's Necklace' for its illuminated arc. Enjoy the breathtaking views of the city skyline and the Arabian Sea as you soak in the evening ambiance.",
          "Duration": "2 hours",
          "Travel Time": "30 minutes from Oberoi Spa"
        }
      ]
    }
  },
  "total_expenses": {
    "Accommodation": "$100 - $250 per night (depending on hotel choice)",
    "Activities": "$50 - $100 per day (including transport and entry fees)",
    "Food": "$25 - $50 per day (depending on dining choices)"
  },
  "hotels": [
    {
      "name": "The Taj Mahal Palace, Mumbai",
      "image": "https://www.tajhotels.com/media/images/hotels/mumbai/taj-mahal-palace/hotel-exterior-2.jpg",
      "rating": 4.8,
      "description": "A landmark hotel with elegant rooms, multiple dining options, and a luxurious spa."
    },
    {
      "name": "The Oberoi Mumbai",
      "image": "https://www.oberoihotels.com/media/images/hotels/mumbai/oberoi-mumbai/hotel-exterior.jpg",
      "rating": 4.7,
      "description": "A sophisticated hotel known for its exceptional service, fine dining, and stunning views."
    },
    {
      "name": "Four Seasons Hotel Mumbai",
      "image": "https://www.fourseasons.com/images/destinations/mum/MUM_exterior_1440x960_999999999999.jpg",
      "rating": 4.6,
      "description": "A stylish hotel with modern rooms, a rooftop pool, and a variety of dining experiences."
    },
    {
      "name": "The Leela Palace, Mumbai",
      "image": "https://www.theleela.com/media/images/hotels/mumbai/the-leela-palace-new-delhi/hotel-exterior.jpg",
      "rating": 4.5,
      "description": "A grand hotel with spacious rooms, multiple restaurants, and a luxurious spa."
    }
  ],
  "map_link": "https://www.google.com/maps/place/Mumbai,+Maharashtra/@19.0760903,72.8774263,10z/data=!3m1!4b1!4m5!3m4!1s0x3be7c63066c00d4f:0x1e065ab491c4136c!8m2!3d19.075983!4d72.8776559",
  "recommended_activities": [
    {
      "name": "Bollywood Studio Tour",
      "image": "https://www.holidify.com/images/cmsuploads/2022/04/bollywood-film-city-mumbai.jpg",
      "rating": 4.5,
      "description": "Experience the magic of Bollywood by taking a tour of a film studio, where you can witness sets, costumes, and learn about the making of movies."
    },
    {
      "name": "Marine Drive Sunset Walk",
      "image": "https://www.holidify.com/images/cmsuploads/2022/01/mumbai-city-skyline-at-night.jpg",
      "rating": 4.8,
      "description": "Enjoy a romantic stroll along Marine Drive as the sun sets, creating a breathtaking spectacle of golden hues over the Arabian Sea."
    },
    {
      "name": "Street Food Tour",
      "image": "https://www.holidify.com/images/cmsuploads/2022/07/street-food-in-mumbai.jpg",
      "rating": 4.6,
      "description": "Embark on a culinary adventure through Mumbai's bustling streets, savoring delicious and authentic street food."
    },
    {
      "name": "Local Market Shopping",
      "image": "https://www.holidify.com/images/cmsuploads/2022/07/street-shopping-in-mumbai.jpg",
      "rating": 4.4,
      "description": "Immerse yourself in the vibrant atmosphere of Mumbai's local markets, where you can find unique clothing, accessories, and souvenirs."
    }
  ],
  "restaurants": [
    {
      "name": "Theobroma",
      "image": "https://www.theobroma.co.in/wp-content/uploads/2019/06/theobroma_website_banner.jpg",
      "rating": 4.6,
      "description": "A popular bakery chain serving delicious pastries, cakes, sandwiches, and beverages. Ideal for breakfast or lunch."
    },
    {
      "name": "Gokul Restaurant",
      "image": "https://www.zomato.com/mumbai/gokul-restaurant-dadar-west/photos#menu-section-Starters",
      "rating": 4.3,
      "description": "A renowned vegetarian restaurant serving authentic South Indian cuisine, perfect for a wholesome and flavorful meal."
    },
    {
      "name": "The Bombay Canteen",
      "image": "https://www.thebombaycanteen.com/assets/img/the-bombay-canteen-restaurant-mumbai-1-1.jpg",
      "rating": 4.5,
      "description": "A modern Indian restaurant offering innovative dishes with a contemporary twist, perfect for a fine dining experience."
    },
    {
      "name": "Leopold Cafe",
      "image": "https://www.holidify.com/images/cmsuploads/2022/04/leopold-cafe-mumbai.jpg",
      "rating": 4.4,
      "description": "A historic cafe known for its traditional Parsi dishes, sandwiches, and beverages. Perfect for a quick bite or a casual meal."
    },
    {
      "name": "Khyber",
      "image": "https://www.holidify.com/images/cmsuploads/2022/04/khyber-restaurant-mumbai.jpg",
      "rating": 4.6,
      "description": "A renowned restaurant serving authentic North Indian cuisine with a focus on Mughal dishes, ideal for a special occasion dinner."
    },
    {
      "name": "Cafe Mondegar",
      "image": "https://www.holidify.com/images/cmsuploads/2022/04/cafe-mondegar-mumbai.jpg",
      "rating": 4.4,
      "description": "A popular cafe known for its classic dishes, sandwiches, and beverages. Perfect for a casual lunch or dinner."
    },
    {
      "name": "Soda Bottle Openerwala",
      "image": "https://www.sodabottleopenerwala.com/wp-content/uploads/2018/04/SBOW-Banner-Image.jpg",
      "rating": 4.5,
      "description": "A restaurant serving authentic Parsi cuisine with a focus on traditional recipes, ideal for a unique and flavorful dining experience."
    }
  ]
}

Ensure that the response is in valid JSON format. If the response is not valid JSON, correct it so that it is valid JSON.`;

    try {
        const result = await chatSession.sendMessage(query);
        return cleanResponse(result.response.text());
    } catch (error) {
        console.error('Error during API call:', error);
        throw new Error('Error generating itinerary');
    }
};

app.get('/generate-itinerary', async (req, res) => {
    try {
        const responseText = await getItinerary();

        // Attempt to parse the cleaned response as JSON
        try {
            const jsonResponse = JSON.parse(responseText);
            res.json(jsonResponse); // Send JSON response
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).send('The response is not in valid JSON format.');
        }
    } catch (error) {
        console.error('Error during API call:', error);
        res.status(500).send('An error occurred while generating the itinerary.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});
