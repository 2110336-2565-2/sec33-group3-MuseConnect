const pretifyDateFormat = (date) => {
  date = new Date(date)
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const word_day = weekday[date.getDay()];
  const day = date.getDate();
  const month = date.getMonth() + 1; // getMonth() returns 0-based index, so we add 1 to get the actual month number
  const year = date.getFullYear();
  const formattedDate = `${word_day} ${day}/${month}/${year}`;
  return formattedDate;
};

const eventFormat = (
  { name, location, phone, date, wage, currentMessageStatus },
  { side, style, i },
  isMusician,
  handleShowModal,
  isLastestEvent,
  setStatus
) => {
  return (
    <div className={`d-flex flex-row justify-content-${side} mb-4`}>
      <div className="p-3 ms-3" style={style}>
        <div key={`message_${i}`} className="small mb-0">
          <p className="mb-0">{name}</p>
          {location !== undefined && <p className="mb-0">{location}</p>}
          {location === undefined && <p className="mb-0">undefined location</p>}
          <p className="mb-0">{phone}</p>
          <p className="mb-0">{pretifyDateFormat(date)}</p>
          <p className="mb-0">{wage} bath</p>
          {isLastestEvent && isMusician && currentMessageStatus !== "CANCELLED" && (
            <span>
              <button
                className="mx-3 mt-2 button-edit-acep"
                onClick={() => setStatus("ACCEPT")}>
                Accept
              </button>
              <button
                className="mx-3 mt-2 button-can-dec"
                onClick={() => setStatus("DECLINE")}>
                Decline
              </button>
            </span>
          )}
          {isLastestEvent && !isMusician && currentMessageStatus !== "CANCELLED" && (
            <div className="edit-cancle">
              <button
                className="mx-3 mt-2 button-edit-acep"
                onClick={() => handleShowModal({ name, wage })}>
                Edit
              </button>
              <button
                className="mx-3 mt-2 button-can-dec"
                onClick={() => setStatus("CANCELLED")}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const haveSide = (user, sender) => {
  if (sender === user._id) {
    return {
      side: "end",
      style: {
        borderRadius: "15px",
        backgroundColor: "white"
      },
    };
  }
  return {
    side: "start",
    style: {
      
      borderRadius: "15px",
      backgroundColor: "#90EE90",
    },
  };
};

module.exports = { eventFormat, haveSide };
