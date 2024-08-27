function FormHeading({title,content}) {
  return (
    <div className="container">
      <h1 className="text-center text-5xl font-bold mb-5">
        {title}
      </h1>
      <p
        className="text-center text-xl font-normal mb-10"
        style={{ color: "#696C74" }}
      >
        {content}
      </p>
    </div>
  );
}

export default FormHeading;
