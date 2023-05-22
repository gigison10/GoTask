import "./sign-up.scss";
import { X } from "../../assets/icons.jsx";
import { Fragment, useState, useEffect, useRef } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase-utils";

const defaultFormFields = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

function SignUp() {
  const [showHide, setShowHide] = useState("hide");
  const [signUp, setSignUp] = useState("Sign-up");
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { fullName, email, phone, password, confirmPassword } = formFields;

  // form imputs reset ////////
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  //       Sign in         ////////
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("incorect confirm password");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { fullName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("email already exists");
      } else {
        console.log("user creation gives an error");
      }
    }
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  ////////////popup window////////////////////////////
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
    if (showHide === "hide") {
      setShowHide("show");
    } else {
      setShowHide("hide");
    }
  }
  ////////////////////////////////////////////////////////

  return (
    <Fragment>
      <div className="log-button" onClick={popup}>
        {signUp}
      </div>
      <div className={`${showHide}`}>
        <div className="popup" ref={popupRef}>
          <div onClick={popup}>
            <X></X>
          </div>
          <form onSubmit={handleSubmit}>
            <h1>I don't have an account</h1>
            <h5>Sign up with your email and password</h5>
            <div className="inputBlock">
              <label>First and Last name</label>
              <input
                type="text"
                required
                onChange={handleChange}
                name="fullName"
                value={fullName}
              ></input>
            </div>
            <div className="inputBlock">
              <label>Email</label>
              <input
                type="email"
                onChange={handleChange}
                name="email"
                value={email}
              ></input>
            </div>
            <div className="inputBlock">
              <label>Phone</label>
              <input
                type="number"
                onChange={handleChange}
                name="phone"
                value={phone}
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
            <div className="inputBlock">
              <label>Confirm Password</label>
              <input
                type="password"
                onChange={handleChange}
                name="confirmPassword"
                value={confirmPassword}
              ></input>
            </div>
            <button className="submitbutton" type="submit" onClick={popup}>
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
export default SignUp;
