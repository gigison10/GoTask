import "./header.scss";
import { useContext, useState } from "react";
import LogIn from "../log-in/log-in";
import SignUp from "../sign-up/sign-up";
import { UserContext } from "../../contexts/context";
import { signOutUser } from "../../utils/firebase/firebase-utils";

function Header() {
  const today = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  const { currentUser } = useContext(UserContext);

  return (
    <header>
      <div>
        <img className="logo" src={require("../../assets/Logo.png")} />
      </div>
      <div>Today : {formattedDate}</div>
      <div>
        <input type="input" placeholder="search" />
      </div>
      <div>Messages</div>
      <div className="signInLogInContainer">
        {currentUser ? (
          <div className="log-button" type="submit" onClick={signOutUser}>
            Sign Out
          </div>
        ) : (
          <>
            <LogIn />
            <SignUp />
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
