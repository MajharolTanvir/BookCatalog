/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm, SubmitHandler } from "react-hook-form";
import { useUserLoginMutation } from "../redux/features/auth/userApi";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import Swal from "sweetalert2";
import { ILoginResponse } from "../Types/GlobalTypes";
import { setUser } from "../redux/features/auth/userSlice";
import { useAppDispatch } from "../redux/hook";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  type CustomError = FetchBaseQueryError & {
    data: {
      success: boolean;
      message: string;
      errorMessages: [];
    };
  };

  const [userLogin, { isLoading, isError, isSuccess, error, data }] =
    useUserLoginMutation();
  const { register, handleSubmit, reset } = useForm<ILoginResponse>();

  useEffect(() => {
    if (isError && error) {
      const customError = error as CustomError;
      if (customError.data) {
        setErrorMessage(customError.data.message);
      }
    }
  }, [error, isError]);

  useEffect(() => {
    if (isSuccess && data) {
      const availableUser = localStorage.getItem("user");
      if (availableUser) {
        localStorage.removeItem("user");
      }
      const { accessToken, firstName, lastName, email } = data.data;
      localStorage.setItem(
        "user",
        JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          accessToken: accessToken,
        })
      );
      dispatch(
        setUser({ firstName: firstName, lastName: lastName, email: email })
      );
      navigate("/");
    }
  }, [data, dispatch, isSuccess, navigate]);

  if (isSuccess) {
    void Swal.fire({
      title: "Successfull",
      text: data.message,
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
    });
  }

  if (isError && error) {
    void Swal.fire({
      title: "Failed!",
      text: errorMessage,
      icon: "error",
      confirmButtonText: "Try Again",
    });
  }

  if (isLoading) {
    return <Loading />;
  }

  const onSubmit: SubmitHandler<ILoginResponse> = (data) => {
    const option = {
      email: data.email,
      password: data.password,
    };

    void userLogin(option);

    reset();
  };

  return (
    <div className="container mx-auto md:h-screen md:flex md:justify-center md:items-center">
      <div className="card card-side bg-base-100 shadow-xl gap-10 flex-col lg:flex-row p-5">
        <div>
          <div>
            <h4 className="text-xl md:text-2xl font-semibold text-center my-4">
              Login here
            </h4>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
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
