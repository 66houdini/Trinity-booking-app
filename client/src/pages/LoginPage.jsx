/* eslint-disable no-unused-vars */
import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);
  async function handleLoginSubmit(ev){
    ev.preventDefault();
    try {
      const {data} = await axios.post("/login", {email, password}, );
      setUser(data);
      alert("login successful");
      setRedirect(true);
    } catch (e) {
      alert("login failed");
    }
    
  }
  if (redirect) {
    return <Navigate to={"/"}/>
  }
  return (
    <>
      <div className="mt-4 grow flex items-center justify-around">
        {/* the -mt-8 negative margin 8, removes 8 margin from the top */}
        <div className="mb-64">
          <h1 className="text-4xl text-center mb-4">Login</h1>
          <form onSubmit={handleLoginSubmit} className="max-w-md mx-auto">
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
            <button className="primary">Login</button>
            <div className="text-center py-2 text-gray-500">
              Dont have an account yet?{" "}
              <Link className="underline text-black" to={"/register"}>
                Register now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
