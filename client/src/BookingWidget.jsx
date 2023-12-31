/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberofNights = 0;
  if (checkIn && checkOut) {
    numberofNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }
  async function bookPlace() {
    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      price: numberofNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      <div className="bg-white shadow p-4 rounded-2xl">
        <div className="text-2xl text-center">
          Price: ${place.price} per night
        </div>
        <div className="border rounded-2xl mt-4">
          <div className="flex checkIn overflow-hidden">
            <div className="py-3 px-4 pr-0">
              <label>Check in: </label>
              <input
                type="date"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
            <div className="py-3 px-4 border-l">
              <label>Check out: </label>
              <input
                type="date"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              />
            </div>
          </div>

          <div className="py-3 px-4 border-t">
            <label>Number of guests:</label>
            <input
              type="number"
              value={numberOfGuests}
              onChange={(ev) => setNumberOfGuests(ev.target.value)}
            />
          </div>
          {numberofNights > 0 && (
            <div className="py-3 px-4 border-t">
              <label>Your full name: </label>
              <input
                type="text"
                placeholder="user name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <label>Phone Number:</label>
              <input
                type="tel"
                placeholder="+2340000000000"
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
              />
            </div>
          )}
        </div>

        <button
          onClick={bookPlace}
          className={`primary mt-4 ${!user ? "opacity-50" : ""}`}
          disabled={!user}
        >
          {!user ? (
            <span className="text-sm">Login to book this place</span>
          ) : (
            <>
              Book this place
              {numberofNights > 0 && (
                <span> ${numberofNights * place.price}</span>
              )}
            </>
          )}
          {/* Book this place
          {numberofNights > 0 && <span> ${numberofNights * place.price}</span>} */}
        </button>
      </div>
    </>
  );
}
