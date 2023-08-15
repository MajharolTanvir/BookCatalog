/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useAddBookMutation } from "../redux/features/bookSlice.ts/BookApi";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Loading from "../components/Loading";
import { useAppSelector } from "../redux/hook";
import { useNavigate } from "react-router-dom";

interface IAddBook {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  addedBy?: string | null;
  year: number;
}
type CustomError = FetchBaseQueryError & {
  data: {
    success: boolean;
    message: string;
    errorMessages: [];
  };
};

export default function AddNewBook() {
  const [errorMessage, setErrorMessage] = useState("");
  const [addBook, { isLoading, isError, isSuccess, error, data }] =
    useAddBookMutation();
  const { user } = useAppSelector((state) => state?.user);
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm<IAddBook>();

  useEffect(() => {
    if (isError && error) {
      const customError = error as CustomError;
      if (customError.data) {
        setErrorMessage(customError.data.message);
      }
    }
  }, [isError, error]);

  if (isSuccess) {
    void Swal.fire({
      title: "Successfull",
      text: data?.message,
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
    });
    navigate("/books");
  }

  if (isError && error) {
    void Swal.fire({
      title: "Failed!",
      text: errorMessage,
      icon: "error",
      confirmButtonText: "Try Again",
    });
  }

  const onSubmit: SubmitHandler<IAddBook> = (data) => {
    
    const option: IAddBook = {
      title: data?.title,
      author: data?.author,
      genre: data?.genre,
      publicationDate: data?.publicationDate,
      year: new Date(data.publicationDate).getFullYear(),
      addedBy: user.email,
    };
    void addBook(option);
    reset();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto md:h-screen md:flex md:justify-center md:items-center">
      <div className="card card-side bg-base-100 shadow-xl gap-10 flex-col lg:flex-row p-5">
        <div>
          <div>
            <h4 className="text-xl md:text-2xl font-semibold text-center my-4">
              Add new book
            </h4>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              className="input input-bordered w-full max-w-xs"
              type="text"
              {...register("title")}
            />
            <label className="label">
              <span className="label-text">Author</span>
            </label>
            <input
              className="input input-bordered w-full max-w-xs"
              type="text"
              {...register("author")}
            />
            <label className="label">
              <span className="label-text">Genre</span>
            </label>
            <input
              className="input input-bordered w-full max-w-xs"
              type="text"
              {...register("genre")}
            />
            <label className="label">
              <span className="label-text">Publish</span>
            </label>
            <input
              className="input input-bordered w-full max-w-xs"
              type="date"
              {...register("publicationDate")}
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
