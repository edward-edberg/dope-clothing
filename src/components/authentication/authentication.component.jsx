import SignUpForm from "../sign-up-form/sign-up-form.component";
import SignInForm from "../sign-in-form/sign-in-form.component";

import "./authentication.styles.scss";

const Authentication = () => {
  return (
    <div className="authentication-container">
      {/* <h1>Sign In Page</h1> */}
      <SignInForm />
      {/* <button onClick={logGoogleUser}>Signin with Google Popup</button> */}
      <SignUpForm />
    </div>
  );
};
export default Authentication;
