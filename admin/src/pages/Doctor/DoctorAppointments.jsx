import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { useState } from "react";

const DoctorAppointments = () => {
  const { appointmentsList, dToken, getAppointments, appointmentHistory } =
    useContext(DoctorContext);

  const [history, setHistory] = useState(false);

  console.log("data:", appointmentsList);
  console.log("History:", appointmentHistory);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    appointmentsList && (
      <div>
        <div>
          <div>
            <h3>{history ? "Appointment History" : "Upcoming Appointments"}</h3>
          </div>
          <div>
            <button onClick={() => setHistory(!history)} type="button">
              {history ? "Appointments" : "History"}
            </button>
          </div>
        </div>
        <hr />
        <div>
          {history ? (
            // history
            <div></div>
          ) : (
            // current appointments
            <div></div>
          )}
        </div>
      </div>
    )
  );
};

export default DoctorAppointments;
