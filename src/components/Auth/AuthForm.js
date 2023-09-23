import { useState, useRef } from "react";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputref = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputref.current.value;

    //optional : add validation

    setIsLoading(true); // y here means we r sending the request
    if (isLogin) {

    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAkBtS8XqPnFWiHAs2Qlb62O_oFyK1aj6Y",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        setIsLoading(false);
        if (res.ok) {
          //......
        } else {
          return res.json().then((data) => {

            //show an error modal

            let errorMessage = "Aunthentication failed";

            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            console.log(data);
            alert(errorMessage);
          });
        }
      });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Loginl" : "Sign Up"}</h1>

      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputref}
          />
        </div>

        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Logink" : "create Account"}</button>
          )}
          {isLoading && <p>loading...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;