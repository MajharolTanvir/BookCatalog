/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useEffect, useState } from "react";
import { useUserSignupMutation } from "../redux/features/auth/userApi";
import Loading from "../components/Loading";


export interface ICredential {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}


export interface ISignup {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function Signup() {
  const [errorMessage, setErrorMessage] = useState("");
  type CustomError = FetchBaseQueryError & {
    data: {
      success: boolean;
      message: string;
      errorMessages: [];
    };
  };

  const [userSignup, { isLoading, isError, isSuccess, error, data }] =
    useUserSignupMutation();

  useEffect(() => {
    if (isError && error) {
      const customError = error as CustomError;
      if (customError.data) {
        setErrorMessage(customError.data.message);
      }
    }
  }, [isError, error]);

  console.log(data)

  useEffect(() => {
    if (isSuccess && data) {
      const { firstName, lastName, email } = data.data.createdUser as ISignup;
      const { accessToken } = data.data;
      localStorage.setItem(
        "user",
        JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          accessToken: accessToken,
        })
      );
    }
  }, [data, isSuccess]);

  if (isSuccess) {
    Swal.fire({
      title: "Successfull",
      text: "Account Created",
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
    });
  }

  if (isError && error) {
    Swal.fire({
      title: "Failed!",
      text: errorMessage,
      icon: "error",
      confirmButtonText: "Try Again",
    });
  }

  const { register, handleSubmit, reset } = useForm();

  if (isLoading) {
    return <Loading />;
  }

  const onSubmit = (userInfo: Record<string, string>): void => {
    const options = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      password: userInfo.password,
    };
    void userSignup(options);
    reset();
  };

  return (
    <div className="container mx-auto md:h-screen md:flex md:justify-center md:items-center">
      <div className="card card-side bg-base-100 shadow-xl gap-10 flex-col lg:flex-row p-5">
        <div>
          <div>
            <h4 className="text-xl md:text-2xl font-semibold text-center my-4">
              Sign up here
            </h4>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              className="input input-bordered w-full max-w-xs"
              type="text"
              {...register("firstName")}
            />
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              className="input input-bordered w-full max-w-xs"
              type="text"
              {...register("lastName")}
            />
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              className="input input-bordered w-full max-w-xs"
              type="email"
              {...register("email")}
            />
            <label className="label">
              <span className="label-text">Password</span>
            </label>

            <input
              className="input input-bordered w-full max-w-xs"
              type="password"
              {...register("password")}
            />
            <input
              className="bg-cyan-600 text-white max-w-xs hover:text-slate-900 hover:bg-cyan-400 w-full py-2 rounded-md mt-5"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
