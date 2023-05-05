import "./header.scss";
import SignInLogIn from "../sign-in-log-in/sign-in-log-in";

function Header() {
  const today = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  console.log(formattedDate); // Output: "May 2, 2023"

  return (
    <header>
      <div>
        <img className="logo" src={require("../../assets/Logo.png")} />
      </div>
      <div>{formattedDate}</div>
      <div>
        <input type="input" placeholder="search" />
      </div>
      <div>Messages</div>
      <SignInLogIn />
    </header>
  );
}

export default Header;
