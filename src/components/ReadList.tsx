/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Link, useParams } from "react-router-dom";
import { BiSolidBookAdd } from "react-icons/bi";
import {
  useAddReadListMutation,
  useGetSingleReadListQuery,
} from "../redux/features/ReadList/ReadLitApi";
import Loading from "./Loading";
import { useAppSelector } from "../redux/hook";
import { useEffect, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import Swal from "sweetalert2";
import { BsEyeFill } from "react-icons/bs";

export default function ReadList() {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.user);
  const [errorMessage, setErrorMessage] = useState("");
  type CustomError = FetchBaseQueryError & {
    data: {
      success: boolean;
      message: string;
      errorMessages: [];
    };
  };
  const [addReadList, { isLoading, isSuccess, isError, error }] =
    useAddReadListMutation(undefined);
  const { data, isLoading: singeReadLoading } = useGetSingleReadListQuery({
    id: id,
    email: user.email,
  });

  useEffect(() => {
    if (isError && error) {
      const customError = error as CustomError;
      if (customError.data) {
        setErrorMessage(customError.data.message);
      }
    }
  }, [isError, error]);
  const handleReadList = () => {
    const option = {
      id: id,
      email: user.email,
    };

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

  if (isLoading || singeReadLoading) {
    return <Loading />;
  }

  return (
    <div>
      {data?.data?.email !== user?.email ? (
        <div>
          <div className="tooltip" data-tip="Add reading book">
            <button
              className="btn bg-cyan-600 hover:bg-cyan-400 text-white hover:text-slate-800 text-xl"
              onClick={handleReadList}
            >
              <BiSolidBookAdd />
            </button>
          </div>
        </div>
      ) : (
        <Link to="/readlists">
          <div className="tooltip" data-tip="View Read List">
            <button className="btn bg-cyan-600 hover:bg-cyan-400 text-white hover:text-slate-800 text-xl">
              <BsEyeFill />
            </button>
          </div>
        </Link>
      )}
    </div>
  );
}
