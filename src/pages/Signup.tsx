import { SetStateAction, useState } from "react";
import { useUserSignupMutation } from "../redux/features/auth/userApi";

export default function Signup() {
  const [userSignup] = useUserSignupMutation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFirstNameChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  const handleSignup = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Do something with the values (e.g., send them to a server or perform validation)
    const option = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    void userSignup(option);

    // Reset the form (optional)
    // setName("");
    // setEmail("");
    // setPassword("");
  };

  return (
    <div className="hero min-h-screen max-w-4xl mx-auto">
      <div className="hero-content flex-col md:flex-row-reverse p-0 md:px-5 lg:gap-10">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Signup now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <form className="card flex-shrink-0 w-full md:max-w-xs lg:max-w-md shadow-xl bg-base-100">
          <div className="card-body p-3 md:px-6 md:py-8">
            <div className="form-control">
              <label className="label">
                <span className="label-text">First name</span>
              </label>
              <input
                type="name"
                placeholder="name"
                className="input input-bordered"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="name"
                placeholder="name"
                className="input input-bordered"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                value={password}
                onChange={handlePasswordChange}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={handleSignup}>
                Signup
              </button>
            </div>
          </div>
        </form>
        {/* <form  className="card flex-shrink-0 w-full md:max-w-xs lg:max-w-md shadow-xl bg-base-100">
          <div className="card-body p-3 md:px-6 md:py-8">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Signup</button>
            </div>
          </div>
        </form> */}
      </div>
    </div>
  );
}
