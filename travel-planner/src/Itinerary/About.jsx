function About({ location, intro, emergency, index }) {
    return (
        <div className="mt-8">
            <h1 className="text-4xl font-bold mb-2">About {location}</h1>
            <p className="text-xl mb-8">{intro}</p>
            <AboutData title="Emergency Numbers" data={emergency} />
            <AboutData title="Life Quality Indices" data={index} />
        </div>
    )
}

function AboutData({ title, data }) {
    return (
        <div className="mb-8">
            <h2 className="text-4xl font-medium">{title}</h2>
            <ul>
                {Object.entries(data[0]).map(([key, value]) => (
                    <li key={key} className="text-xl list-disc ml-5">{key}: {value}</li>
                ))}
            </ul>
        </div>
    );
}
export default About