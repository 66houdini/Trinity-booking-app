/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import PlacesPage from "./PlacesPage";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { user, ready, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (!ready) {
    return "Loading....";
  }
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <>
      <div>
        <AccountNav/>
        {subpage === "profile" && (
          <div className="text-center max-w-lg mx-auto">
            Logged in as {user.name} ({user.email}) <br />
            <button onClick={logout} className="primary max-w-sm mt-2">
              Logout
            </button>
          </div>
        )}
        {subpage === "places" && <PlacesPage />}
      </div>
    </>
  );
}
