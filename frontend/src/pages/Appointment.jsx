import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { doctorAvailability } from "../assets/assets";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docAvailability, setDocAvailability] = useState(null);

  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const currentDoctor = async () => {
    setDocInfo(doctors.find((doc) => doc._id === docId));
    setDocAvailability(
      doctorAvailability.find((doc) => doc.doctorId === docId),
    );
  };

  const getAvailableSlots = () => {
    if (!docAvailability) return;

    let allSlots = [];

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const dayName = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
      });

      // Check leave
      const dateString = currentDate.toISOString().split("T")[0];

      if (docAvailability.leaves.includes(dateString)) {
        continue;
      }

      let daySlots = [];

      // Find all sessions for this day
      const sessions = docAvailability.availability.filter((session) =>
        session.days.includes(dayName),
      );

      // Doctor doesn't work today
      if (sessions.length === 0) {
        continue;
      }

      for (const session of sessions) {
        const [startHour, startMinute] = session.start.split(":").map(Number);

        const [endHour, endMinute] = session.end.split(":").map(Number);

        let slotStart = new Date(currentDate);
        slotStart.setHours(startHour, startMinute, 0, 0);

        let slotEnd = new Date(currentDate);
        slotEnd.setHours(endHour, endMinute, 0, 0);

        // Skip passed slots for today
        if (i === 0) {
          while (slotStart < today && slotStart < slotEnd) {
            slotStart.setMinutes(slotStart.getMinutes() + session.slotDuration);
          }
        }

        while (slotStart < slotEnd) {
          daySlots.push({
            datetime: new Date(slotStart),
            time: slotStart.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          });

          slotStart.setMinutes(slotStart.getMinutes() + session.slotDuration);
        }
      }

      allSlots.push(daySlots);
    }

    setDocSlot(allSlots);
  };

  useEffect(() => {
    currentDoctor();
  }, [docId, doctors]);

  useEffect(() => {
    if (docAvailability) {
      getAvailableSlots();
      console.log(docAvailability);
    }
  }, [docAvailability]);

  // useEffect(() => {
  //   console.log(docSlot);
  // }, [docSlot]);

  return (
    docInfo && (
      <div>
        {/* doctor info */}
        <div>
          <div>
            <img src={docInfo.image} alt="" />
          </div>

          <div>
            <p>{docInfo.name}</p>
            <div>
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <span>{docInfo.experience}</span>
            </div>

            <div>
              <p>About</p>
              <p>{docInfo.about}</p>
            </div>
            <p>
              Appointment fee: <span>{docInfo.fees}</span>
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default Appointment;
