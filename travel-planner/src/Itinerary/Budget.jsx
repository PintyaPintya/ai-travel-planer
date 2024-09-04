function Budget({ data }) {

    if (!data || Object.keys(data).length === 0) {
        return <p>Fetching data, please wait...</p>;
    }

    return (
        <div className="mb-6">
            <h3 className="text-3xl font-medium mb-1">Budget breakdown</h3>
            <p className="text-xl mb-0.5">Accomodation: {data.Accommodation}</p>
            <p className="text-xl mb-0.5">Activities: {data.Activities}</p>
            <p className="text-xl mb-0.5">Food: {data.Food}</p>
        </div>
    )
}

export default Budget