import "./sign-in-log-in.scss";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase-utils";

function SignInLogIn() {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    // console.log(response);
  };
  return (
    <div className="signInLogInContainer">
      <div className="log-button" onClick={logGoogleUser}>
        Log-in
      </div>
      <div className="log-button">Sign-in</div>
    </div>
  );
}

export default SignInLogIn;
