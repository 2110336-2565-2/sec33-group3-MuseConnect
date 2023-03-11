const eventFormat = (
  { Name, Location, Phone, Date, Wage },
  { side, style, i }
) => {
  return (
    <div className={`d-flex flex-row justify-content-${side} mb-4`}>
      <div className="p-3 ms-3" style={style}>
        <p key={`message_${i}`} className="small mb-0">
          <p className="mb-0">{Name}</p>
          {location !== "undefined" && <p className="mb-0">{Location}</p>}
          <p className="mb-0">{Phone}</p>
          <p className="mb-0">{Date}</p>
          <p className="mb-0">{Wage}</p>
          <button className="mx-3 mt-2">Edit</button>
          <button className="mx-3 mt-2">Cancle</button>
        </p>
      </div>
    </div>
  );
};

export default eventFormat;
