import "./header.scss";
import { useContext, useEffect, useState } from "react";
import LogIn from "../log-in/log-in";
import SignUp from "../sign-up/sign-up";
import { UserContext } from "../../contexts/context";
import { signOutUser } from "../../utils/firebase/firebase-utils";

function Header() {
  const today = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const { currentUserId } = useContext(UserContext);

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (currentUserId) {
      setUserEmail(currentUserId.email);
    } else {
      setUserEmail("");
    }
  }, [currentUserId]);

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
        {currentUserId ? (
          <>
            <div className="email">{userEmail}</div>
            <div className="log-button" type="submit" onClick={signOutUser}>
              Sign Out
            </div>
          </>
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
