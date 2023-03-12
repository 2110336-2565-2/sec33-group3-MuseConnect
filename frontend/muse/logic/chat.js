const eventFormat = (
  { Name, Location, Phone, Date, Wage },
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
          <p className="mb-0">{Name}</p>
          {Location !== "undefined" && <p className="mb-0">{Location}</p>}
          <p className="mb-0">{Phone}</p>
          <p className="mb-0">{Date}</p>
          <p className="mb-0">{Wage} bath</p>
          {isLastestEvent && isMusician && (
            <span>
              <button className="mx-3 mt-2" onClick={() => setStatus("ACCEPT")}>
                Accept
              </button>
              <button
                className="mx-3 mt-2"
                onClick={() => setStatus("DECLINE")}
              >
                Decline
              </button>
            </span>
          )}
          {isLastestEvent && !isMusician && (
            <div class="edit-cancle">
              <button
                className="mx-3 mt-2 button-edit"
                onClick={() => handleShowModal({ Name, Wage })}
              >
                Edit
              </button>
              <button
                className="mx-3 mt-2"
                onClick={() => setStatus("CANCELLED")}
              >
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
        backgroundColor: "rgba(57, 192, 237,.2)",
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
