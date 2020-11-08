import React, { useState } from "react";
import { auth } from "../firebase";
import "./Header.css";
import logo from "../assets/todo-logo.svg";

function Header(props) {
  const [openSignup, setOpenSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupHandler = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((err) => alert(err.message));
    setOpenSignup(false);
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const loginHandler = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message));

    setOpenLogin(false);
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <div className="header">
        <div className="header__logo">
          <img src={logo} alt="logo" />
          <div className="header__name">Todos</div>
        </div>
        <div className="auth__form">
          {props.user ? (
            <button className="logout" onClick={() => auth.signOut()}>
              Logout
            </button>
          ) : (
            <>
              <button className="signup" onClick={() => setOpenSignup(true)}>
                Sign up
              </button>
              <button className="login" onClick={() => setOpenLogin(true)}>
                log in
              </button>
            </>
          )}
        </div>
      </div>
      <div
        style={!openSignup ? { display: "none" } : { display: "block" }}
        className="modal__signup"
        // onClick={(e) => setOpen(false)}
      >
        <div className="modal-content__signup">
          <form className="form__signup" noValidate>
            <div className="form__close">
              <img
                src="https://img.icons8.com/flat_round/64/000000/delete-sign.png"
                alt="close"
                onClick={(e) => setOpenSignup(false)}
              />
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form__input"
              placeholder="Username"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form__input"
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form__input"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="submit__signup"
              onClick={signupHandler}
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
      <div
        style={!openLogin ? { display: "none" } : { display: "block" }}
        className="modal__login"
        // onClick={(e) => setOpen(false)}
      >
        <div className="modal-content__login">
          <form className="form__login" noValidate>
            <div className="form__close">
              <img
                src="https://img.icons8.com/flat_round/64/000000/delete-sign.png"
                alt="close"
                onClick={(e) => setOpenLogin(false)}
              />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form__input"
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form__input"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="submit__login"
              onClick={loginHandler}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Header;
