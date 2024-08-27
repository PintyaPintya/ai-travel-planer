function DateComponent({ selectDate, setSelectDate }) {
  const handleDateChange = (event) => {
    setSelectDate(event.target.value);
  };

  const getFormattedDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="flex justify-between items-center mb-10">
      <label htmlFor="date" className="text-2xl font-medium nakli-black">
        What date works best for you?
      </label>
      <input
        type="date"
        id="date"
        min={getFormattedDate()}
        value={selectDate}
        onChange={handleDateChange}
        className="border w-44 py-3 pr-3 pl-4 rounded-xl"
        required
      />
    </div>
  );
}

export default DateComponent;
