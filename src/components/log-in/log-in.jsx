import "./log-in.scss";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase-utils";
import { useState, useEffect, useRef, Fragment } from "react";
import { X } from "../../assets/icons.jsx";

function LogIn() {
  const [showHide, setShowHide] = useState("hide");
  let popupRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      // console.log(popupRef.current.contains(e.target));
      if (!popupRef.current.contains(e.target)) {
        setShowHide("hide");
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  function popup() {
    console.log("asds");
    if (showHide === "hide") {
      setShowHide("show");
    } else {
      setShowHide("hide");
    }
  }

  //  google log in //////////////

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <Fragment>
      <div className="log-button" onClick={popup}>
        Log-in
      </div>

      <div className={`${showHide}`}>
        <div className="popup" ref={popupRef}>
          <form>
            <div onClick={popup}>
              <X></X>
            </div>
            <h1>Log in</h1>
            <div className="inputBlock">
              <label>Email address</label>
              <input
                type="text"
                required
                // onChange={handleChange}
                name="fullName"
                // value={fullName}
              ></input>
            </div>
            <div className="inputBlock">
              <label>Password</label>
              <input
                type="password"
                // onChange={handleChange}
                name="password"
                // value={password}
              ></input>
            </div>

            <button className="submitbutton" type="submit">
              SUBMIT
            </button>
          </form>

          <div className="googleAuthButton">
            <img
              className="googleIcon"
              src={require("../../assets/googleIcon.png")}
            />
            <h3 onClick={logGoogleUser}>Or continue with Google</h3>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default LogIn;
