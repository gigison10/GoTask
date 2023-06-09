import "./log-in.scss";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase-utils";

import { useState, useEffect, useRef, Fragment } from "react";
import { X } from "../../assets/icons.jsx";

const defaultFormFields = {
  email: "",
  password: "",
};

function LogIn() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  function handleChange(event) {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  //~~~ Log In Forms ///
  const logGoogleUser = async (event) => {
    popup();
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      resetFormFields();
    } catch (error) {}
  };

  ////////////////////////////////////////////////////////
  const [showHide, setShowHide] = useState("hide");
  let popupRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      // console.log(popupRef.current.contains(e.target));
      if (!popupRef.current.contains(e.target)) {
        setShowHide("hide");
        resetFormFields();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  function popup() {
    if (showHide === "hide") {
      setShowHide("show");
    } else {
      setShowHide("hide");
      resetFormFields();
    }
  }
  ///////////////////////////////////////////////////

  return (
    <Fragment>
      <div className="log-button" onClick={popup}>
        Log-in
      </div>

      <div className={`${showHide}`}>
        <div className="popup" ref={popupRef}>
          <div onClick={popup}>
            <X></X>
          </div>
          <form onSubmit={handleSubmit}>
            <h1>Log in</h1>
            <div className="inputBlock">
              <label>Email address</label>
              <input
                type="text"
                required
                onChange={handleChange}
                name="email"
                value={email}
              ></input>
            </div>
            <div className="inputBlock">
              <label>Password</label>
              <input
                type="password"
                onChange={handleChange}
                name="password"
                value={password}
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
