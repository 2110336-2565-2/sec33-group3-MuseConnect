// const cancelEventHandler = ({userToken, latestEvent}) => {
//   console.log("Cancel Event Handler", eventId, userToken);
//   fetch(`http://localhost:4000/api/event/${eventId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${userToken}`,
//     },
//     body: JSON.stringify({
//       status: "CANCELLED",
//     }),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Failed to cancel event to database");
//       }
//       console.log("Successfully cancel event");
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//     }).catch((error) => {
//       console.error(error);
//     });
// }

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
        <p key={`message_${i}`} className="small mb-0">
          <p className="mb-0">{Name}</p>
          {Location !== "undefined" && <p className="mb-0">{Location}</p>}
          <p className="mb-0">{Phone}</p>
          <p className="mb-0">{Date}</p>
          <p className="mb-0">{Wage} bath</p>
          {isLastestEvent && isMusician && (
            <div>
              <button className="mx-3 mt-2" onClick={() => setStatus("accept")}>
                Accept
              </button>
              <button
                className="mx-3 mt-2"
                onClick={() => setStatus("decline")}
              >
                Decline
              </button>
            </div>
          )}
          {isLastestEvent && !isMusician && (
            <div>
              <button
                className="mx-3 mt-2"
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
        </p>
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
