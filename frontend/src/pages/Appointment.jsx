import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import RelatedDoctors from "../components/RelatedDoctors";
import {toast} from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
  const { docId } = useParams();
  const { backendUrl } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docAvailability, setDocAvailability] = useState(null);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // const [doctorAvailability, setDoctorAvailability] = useState([])

  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");


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

  const getDoctorDetails = async () => {
    try {
      const {data} = await axios.get(backendUrl + `/api/admin/doctors/${docId}/doctor-details`)
      console.log(data)
    } catch (error) {
      toast.error(error.message)
      console.log(error.message)
    }
  }

  useEffect(() => {
    getDoctorDetails()
  }, [docId]);

  useEffect(() => {
    if (docAvailability) {
      getAvailableSlots();
    }
  }, [docAvailability]);

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
