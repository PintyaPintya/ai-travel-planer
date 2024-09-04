import { useState } from "react";

function ItineraryMain({ data }) {
    const [openDays, setOpenDays] = useState([1]);

    const toggleDay = (day) => {
        setOpenDays((prevOpenDays) =>
            prevOpenDays.includes(day)
                ? prevOpenDays.filter((d) => d !== day)
                : [...prevOpenDays, day]
        );
    };

    if (!data || Object.keys(data).length === 0) {
        return <p>Fetching data, please wait...</p>;
    }

    return (
        <div className="w-1/2 pb-4 ">
            {Object.entries(data).map(([dayTitle, dayData]) => (
                <DayItem
                    key={dayTitle}
                    dayTitle={dayTitle}
                    dayData={dayData}
                    toggleDay={toggleDay}
                    openDays={openDays}
                />
            ))}
        </div>
    );
}

function DayItem({ dayTitle, dayData, toggleDay, openDays }) {
    const day = parseInt(dayTitle.split(" ")[1], 10);
    const isOpen = openDays.includes(day);

    return (
        <div className="mb-4">
            <button
                className="w-full text-left bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition flex items-center justify-between"
                onClick={() => toggleDay(day)}
            >
                <span>{dayTitle}</span>
                <span className="ml-2">
                    <svg
                        className={`w-5 h-5 transition-transform ${isOpen ? "rotate-0" : "rotate-180"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 15l7-7 7 7"
                        />
                    </svg>
                </span>
            </button>
            <div
                className={`overflow-hidden transition-max-height duration-300 ease-in-out ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
            >
                <div className="mt-2">
                    {dayData.Activities.map((activity) => (
                        <ActivityCard key={activity.Location} activity={activity} />
                    ))}
                </div>
            </div>
        </div>
    );
}


function ActivityCard({ activity }) {
    return (
        <div className="border-b border-gray-300 mb-4 pb-4">
            <div className="flex justify-between items-center mb-2">
                <h4 className="text-xl font-semibold">{activity.Location}</h4>
                <p className="border rounded-2xl bg-gray-400 px-2.5 py-1 text-white text-sm">{activity.Duration}</p>
            </div>
            <div className="flex gap-4">
                <img
                    src={activity.image}
                    alt={activity.Location}
                    className="w-1/3 h-auto object-cover rounded-md"
                />
                <div className="w-2/3">
                    <p className="text-sm mb-2">{activity.Description}</p>
                    <p className="text-sm font-medium">{activity["Travel Time"]}</p>
                </div>
            </div>
        </div>
    );
}

export default ItineraryMain;
