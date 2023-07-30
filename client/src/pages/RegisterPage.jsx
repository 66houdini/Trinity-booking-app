/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function registerUSer(ev){
    ev.preventDefault();
    try {
         await axios.post("/register", {
      name, 
      email,
      password
    });
    alert("Registration successful, you can login"); 
    } catch (err) {
        alert("registration failed,try again");
    }

  }
  return (
    <>
      <div className="mt-4 grow flex items-center justify-around">
        {/* the -mt-8 negative margin 8, removes 8 margin from the top */}
        <div className="mb-64">
          <h1 className="text-4xl text-center mb-4">Register</h1>
          <form className="max-w-md mx-auto" onSubmit={registerUSer}>
            <input
              type="text"
              placeholder="user name"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <input
              type="email"
              placeholder="user@email.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <button className="primary">Register</button>
            <div className="text-center py-2 text-gray-500">
              Already a member?{" "}
              <Link className="underline text-black" to={"/login"}>
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
