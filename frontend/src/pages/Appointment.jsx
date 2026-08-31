import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState(null);
  const [docAvailability, setDocAvailability] = useState(null);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // const [doctorAvailability, setDoctorAvailability] = useState([])

  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const getAvailableSlots = () => {
    if (!docAvailability || !docInfo) return;

    const allSlots = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const dayName = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
      });

      // YYYY-MM-DD
      const dateString = [
        currentDate.getFullYear(),
        String(currentDate.getMonth() + 1).padStart(2, "0"),
        String(currentDate.getDate()).padStart(2, "0"),
      ].join("-");

      // Check leave
      const isOnLeave = docAvailability.leaves.some((leave) => {
        const leaveDate = new Date(leave.date);

        const leaveDateString = [
          leaveDate.getFullYear(),
          String(leaveDate.getMonth() + 1).padStart(2, "0"),
          String(leaveDate.getDate()).padStart(2, "0"),
        ].join("-");

        return leaveDateString === dateString;
      });

      if (isOnLeave) continue;

      // Get booked slots for this date
      const bookedSlots = docInfo.slots_booked?.[dateString] || [];

      console.log("Date:", dateString);
      console.log("Booked slots:", bookedSlots);

      // Find sessions
      const sessions = docAvailability.availability.filter((session) =>
        session.days.includes(dayName),
      );

      if (sessions.length === 0) continue;

      let daySlots = [];

      for (const session of sessions) {
        const [startHour, startMinute] = session.start.split(":").map(Number);

        const [endHour, endMinute] = session.end.split(":").map(Number);

        const slotStart = new Date(currentDate);
        slotStart.setHours(startHour, startMinute, 0, 0);

        const slotEnd = new Date(currentDate);
        slotEnd.setHours(endHour, endMinute, 0, 0);

        const currentSlot = new Date(slotStart);

        // Skip passed slots for today
        if (i === 0) {
          while (currentSlot < today && currentSlot < slotEnd) {
            currentSlot.setMinutes(
              currentSlot.getMinutes() + session.slotDuration,
            );
          }
        }

        while (currentSlot < slotEnd) {
          const slotTime = currentSlot.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          // Check whether this slot is already booked
          const isBooked = bookedSlots.some(
            (bookedTime) =>
              bookedTime.trim().toLowerCase() === slotTime.trim().toLowerCase(),
          );

          if (!isBooked) {
            daySlots.push({
              datetime: new Date(currentSlot),
              time: slotTime,
            });
          }

          currentSlot.setMinutes(
            currentSlot.getMinutes() + session.slotDuration,
          );
        }
      }

      // Don't add a day if every slot is booked
      if (daySlots.length > 0) {
        allSlots.push(daySlots);
      }
    }

    setDocSlot(allSlots);
  };

  const getDoctorDetails = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + `/api/user/doctors/${docId}/doctor-details`,
      );
      if (data.success) {
        // console.log("doctor:", data);
        setDocInfo(data?.data?.doctorData);
        setDocAvailability(data?.data?.availability);
      } else {
        toast.error(error.message);
        console.log(error.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warning("User should login!");
      return navigate("/login");
    }

    try {
      const date = docSlot[slotIndex][0].datetime;

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      const slotDate = `${year}-${month}-${day}`;

      const { data } = await axios.post(
        backendUrl + `/api/user/doctors/${docId}/book-appointment`,
        { slotDate, slotTime },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getDoctorDetails();
  }, [docId]);

  useEffect(() => {
    if (docAvailability && docInfo) {
      getAvailableSlots();
    }
  }, [docAvailability, docInfo]);

  // useEffect(() => {
  //   console.log(docSlot);
  // }, [docSlot]);

  return (
    docInfo && (
      <section className="mx-auto max-w-7xl px-6 py-10">
        {/* Doctor Information */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Doctor Image */}
          <div className="lg:w-1/3">
            <div className="overflow-hidden rounded-3xl bg-blue-50">
              <img
                src={docInfo.image}
                alt={docInfo.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Doctor Details */}
          <div className="flex-1 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold text-slate-900">
                {docInfo.name}
              </h1>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                Available
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
                {docInfo.degree}
              </span>

              <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                {docInfo.speciality}
              </span>

              <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                {docInfo.experience}
              </span>
            </div>

            {/* About */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-slate-900">About</h2>

              <p className="mt-3 leading-7 text-slate-600">{docInfo.about}</p>
            </div>

            {/* Fee */}
            <div className="mt-8 border-t border-slate-200 pt-6">
              <p className="text-sm font-medium text-slate-500">
                Consultation Fee
              </p>

              <p className="mt-2 text-3xl font-bold text-blue-600">
                ₹{docInfo.fees}
              </p>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Select Appointment Slot
          </h2>

          {/* Days */}
          <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
            {" "}
            {docSlot.map((slots, index) => {
              if (slots.length === 0) return null;

              const firstSlot = slots[0];

              return (
                <button
                  key={index}
                  onClick={() => {
                    setSlotIndex(index);
                    setSlotTime("");
                  }}
                  className={`min-w-[68px] rounded-xl border px-3 py-3 transition ${
                    slotIndex === index
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-blue-600"
                  }`}
                >
                  <p className="text-xs font-medium">
                    {" "}
                    {daysOfWeek[firstSlot.datetime.getDay()]}
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    {" "}
                    {firstSlot.datetime.getDate()}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Time Slots */}
          <div className="mt-6 flex flex-wrap gap-2">
            {" "}
            {docSlot.length > 0 &&
              docSlot[slotIndex].map((item, i) => (
                <button
                  key={i}
                  onClick={() => setSlotTime(item.time)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    slotTime === item.time
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-300 text-slate-700 hover:border-blue-600 hover:text-blue-600"
                  }`}
                >
                  {item.time}
                </button>
              ))}
          </div>

          {/* Button */}
          <button
            onClick={() => {
              bookAppointment();
              window.scrollTo(0, 0);
            }}
            disabled={!slotTime}
            className={`mt-8 rounded-xl px-6 py-3 font-medium transition ${
              slotTime
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "cursor-not-allowed bg-slate-300 text-white"
            }`}
          >
            Book Appointment
          </button>
        </div>

        {/* Related Doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </section>
    )
  );
};

export default Appointment;
