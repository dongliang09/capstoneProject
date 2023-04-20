import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      history.push("/feed")
    }
  };

  return (
    <>
      <h1>Log In</h1>
      <h3>Stay updated on your professional world</h3>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        <button type="submit">Log In</button>
        <button
            type='submit'
            onClick={() => {
              setEmail('demo@aa.io');
              setPassword('password');
            }}
            className="bg-blue-dff color-white cursor-p border-0 pad-tb-10p fontS-115rem borderR-5p">
            Log in as Demo User
          </button>
      </form>
      <div>New to Link-us? <Link to="/signup">Sign up now</Link></div>
    </>
  );
}

export default LoginFormPage;
