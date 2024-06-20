import React, { FC, FormEvent, useContext, useState } from "react";
import {AuthContext, AuthResponse} from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

interface RegisterProps {
  showAlert: (type: string, message: string) => void;
}

const Register: FC<RegisterProps> = ({ showAlert }) => {
  const context = useContext(AuthContext);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  if(!context){
    throw new Error("AuthContext should be used under the provider children")
  }
  const { register } = context;
  const navigate = useNavigate();
  const handleRegister = async (event : FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res :AuthResponse = await register({ username, email, password });
    if (res.success) navigate("/");
    else showAlert("danger", res.error? res.error[0] : "Register Failed!");
  };

  return (
    <>
      <div className="d-flex justify-content-center flex-column align-items-center mt-5">
        <h2 className="my-3 text-align-center">Sign Up</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              minLength={5}
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              autoComplete="off"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              minLength={5}
              required
              autoComplete="off"
            />
          </div>

          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Register;
