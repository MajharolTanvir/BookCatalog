/* eslint-disable @typescript-eslint/no-misused-promises */
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAddReadListMutation } from "../redux/features/ReadList/ReadLitApi";
import Loading from "./Loading";
import { useAppSelector } from "../redux/hook";
import { useEffect, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import Swal from "sweetalert2";

interface IFormInput {
  id: string;
  email: string;
  status: string;
}

export default function ReadList() {
    const { id } = useParams()
    const { user } = useAppSelector(state => state.user)
    const [errorMessage, setErrorMessage] = useState("");
    type CustomError = FetchBaseQueryError & {
      data: {
        success: boolean;
        message: string;
        errorMessages: [];
      };
    };
    const [addReadList, { isLoading, isSuccess, isError, error }] = useAddReadListMutation(undefined)
    const { register, handleSubmit } = useForm<IFormInput>();

      useEffect(() => {
        if (isError && error) {
          const customError = error as CustomError;
          if (customError.data) {
            setErrorMessage(customError.data.message);
          }
        }
      }, [isError, error]);
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        const option = {
            id: id,
            email: user.email,
            status: data.status
        }

        void addReadList(option);
    };

    if (isSuccess) {
      void Swal.fire({
        title: "Successfull",
        text: "ReadList added",
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
        return <Loading/>

    }

  return (
    <div>
      <form
        className="flex flex-col md:flex-row gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <select
          className="p-3 rounded-md bg-transparent active:border-cyan-600 text-slate-900 w-full md:w-[45%]"
          {...register("status")}
        >
          <option defaultValue={"Reading soon"}>Reading soon</option>
          <option value="Reading">Reading</option>
          <option value="Finished">Finished</option>
        </select>
        <input
          className="btn bg-cyan-600 text-white hover:text-slate-900 hover:bg-cyan-400 w-full md:w-[40%]"
          type="submit"
        />
      </form>
    </div>
  );
}
