/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useEffect, useState } from "react";
import { useAddReviewMutation } from "../redux/features/ReviewApi";
import { SubmitHandler, useForm } from "react-hook-form";
import Loading from "./Loading";
import Swal from "sweetalert2";
import { useAppSelector } from "../redux/hook";
import { useParams } from "react-router-dom";
import { IReview } from "../Types/GlobalTypes";

export default function AddReview() {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  type CustomError = FetchBaseQueryError & {
    data: {
      success: boolean;
      message: string;
      errorMessages: [];
    };
  };

  const { user } = useAppSelector((state) => state?.user);
  const [addReview, { isLoading, isError, isSuccess, error, data }] =
    useAddReviewMutation(undefined);

  const { register, handleSubmit, reset } = useForm<IReview>();

  useEffect(() => {
    if (isError && error) {
      const customError = error as CustomError;
      if (customError.data) {
        setErrorMessage(customError.data.message);
      }
    }
  }, [error, isError]);

  if (isSuccess) {
    void Swal.fire({
      title: "Successfull",
      text: data?.message,
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

  const onSubmit: SubmitHandler<IReview> = (data) => {
    const option = {
      id: id,
      email: user.email,
      reviewText: data.reviewText,
    };

    void addReview(option);
    console.log(option)

    reset();
  };

  return (
    <div>
      <div>
        <h4 className="text-xl md:text-2xl font-semibold text-center my-4">
          Write a review!!
        </h4>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="label">
          <span className="label-text">Review</span>
        </label>
        <textarea
          className="input input-bordered w-full max-w-xs p-2"
          {...register("reviewText")}
        />
        <input
          className="bg-cyan-600 text-white max-w-xs hover:text-slate-900 hover:bg-cyan-400 w-full py-2 rounded-md mt-5"
          type="submit"
        />
      </form>
    </div>
  );
}
