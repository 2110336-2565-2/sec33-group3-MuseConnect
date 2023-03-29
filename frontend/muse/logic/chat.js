import { useRouter } from "next/router";
const { Button } = require("react-bootstrap");

const pretifyDateFormat = (date) => {
  date = new Date(date);
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const word_day = weekday[date.getDay()];
  const day = date.getDate();
  const month = date.getMonth() + 1; // getMonth() returns 0-based index, so we add 1 to get the actual month number
  const year = date.getFullYear();
  const formattedDate = `${word_day} ${day}/${month}/${year}`;
  return formattedDate;
};

const handleTransaction = (eventId) => {
  // const router = useRouter();
  // router.push("/Home");
  window.location.href = `/Transaction/${eventId}`;
};

const isShowMusicianButton = (
  isLastestEvent,
  isMusician,
  currentMessageStatus
) => {
  return isLastestEvent && isMusician && currentMessageStatus !== "CANCELLED";
};

const isShowOrganizerButton = (
  isLastestEvent,
  isMusician,
  currentMessageStatus
) => {
  return isLastestEvent && !isMusician && currentMessageStatus !== "CANCELLED";
};

const isShowTransactionButton = (isLastestEvent, currentMessageStatus) => {
  return isLastestEvent && currentMessageStatus !== "CANCELLED";
};

const eventFormat = (
  { name, location, phone, date, wage, currentMessageStatus, eventId },
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
          <p className="mb-0 ">{name}</p>
          {location !== undefined && <p className="mb-0">{location}</p>}
          {location === undefined && <p className="mb-0">undefined location</p>}
          <p className="mb-0">{phone}</p>
          <p className="mb-0">{pretifyDateFormat(date)}</p>
          <p className="mb-0">{wage} ฿</p>
          {isShowMusicianButton(
            isLastestEvent,
            isMusician,
            currentMessageStatus
          ) && (
            <span>
              <Button
                variant="primary"
                className="mx-3 mt-2 button-edit-acep"
                onClick={() => {
                  if (window.confirm("Are you sure you want to accept?")) {
                    setStatus("ACCEPT");
                  }
                }}
              >
                Accept
              </Button>
              <Button
                variant="danger"
                className="mx-3 mt-2 button-can-dec"
                onClick={() => {
                  if (window.confirm("Are you sure you want to decline?")) {
                    setStatus("DECLINE");
                    alert();
                  }
                }}
              >
                Decline
              </Button>
            </span>
          )}
          {isShowOrganizerButton(
            isLastestEvent,
            isMusician,
            currentMessageStatus
          ) && (
            <div className="edit-cancle">
              <Button
                variant="primary"
                className="mx-3 mt-2 button-edit-acep"
                onClick={() => handleShowModal({ name, wage })}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                className="mx-3 mt-2 button-can-dec"
                onClick={() => setStatus("CANCELLED")}
              >
                Cancel
              </Button>
            </div>
          )}
          {isShowTransactionButton(isLastestEvent, currentMessageStatus) && (
            <div className="view-transaction text-center">
              <button
                type="button"
                className="mx-3 mt-2 btn btn-info"
                onClick={() => handleTransaction(eventId)}
              >
                Transaction
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
