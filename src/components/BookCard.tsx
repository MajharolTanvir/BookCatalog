/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Link } from "react-router-dom";
import { IBook } from "../Types/GlobalTypes";
import { GiSelfLove } from "react-icons/gi";
import { BsEyeFill } from "react-icons/bs";
import {
  useAddWishlistMutation,
  useGetSingleWishlistQuery,
} from "../redux/features/wishlist/WishlistApi";
import Loading from "./Loading";
import { useAppSelector } from "../redux/hook";
import { IUserState } from "../redux/features/auth/userSlice";
import { useEffect, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import Swal from "sweetalert2";
import ReadList from "./ReadList";

interface BookProps {
  book: IBook;
}

export default function BookCard({ book }: BookProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAppSelector((state: { user: IUserState }) => state.user);
  const { id, title, author, genre, publicationDate } = book;

  const { data: wishlist, isLoading } = useGetSingleWishlistQuery({
    id: id,
    email: user?.email,
  });
  const [
    addWishList,
    { isLoading: wishlistLoading, isError, isSuccess, error },
  ] = useAddWishlistMutation(undefined);

  type CustomError = FetchBaseQueryError & {
    data: {
      success: boolean;
      message: string;
      errorMessages: [];
    };
  };

  useEffect(() => {
    if (isError && error) {
      const customError = error as CustomError;
      if (customError.data) {
        setErrorMessage(customError.data.message);
      }
    }
  }, [isError, error]);

  const handleWishlist = () => {
    const option = {
      id: id,
      email: user?.email,
      status: "Wishlist",
    };

    void addWishList(option);
  };

  if (isSuccess) {
    void Swal.fire({
      title: "Successful",
      text: "WishList added",
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
    });
  }

  if (isError && error) {
    if (errorMessage === "ValidationError") {
      void Swal.fire({
        title: "Failed!",
        text: "Login now",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
    void Swal.fire({
      title: "Failed!",
      text: errorMessage,
      icon: "error",
      confirmButtonText: "Try Again",
    });
  }

  if (isLoading || wishlistLoading) {
    return <Loading />;
  }

  return (
    <div className="card w-full md:w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Title: {title}</h2>
        <p>Author: {author}</p>
        <p>Genre: {genre}</p>
        <p>Publish: {publicationDate}</p>
        <div className="card-actions pt-5 flex-nowrap">
          <Link className="w-[50%]" to={`/book-details/${id}`}>
            <button className="btn bg-cyan-600 text-white hover:text-slate-900 hover:bg-cyan-400">
              View details
            </button>
          </Link>
        </div>
        <div>
          <div className="card-actions pt-5">
            {!wishlist.data && (
              <div className="tooltip" data-tip="WishList">
                <button
                  onClick={handleWishlist}
                  className="btn bg-cyan-600 hover:bg-cyan-400 text-white hover:text-slate-800 text-xl"
                >
                  <GiSelfLove />
                </button>
              </div>
            )}
            {wishlist?.data?.email === (user?.email !== undefined) && (
              <Link to={`/wishlists`}>
                <div className="tooltip" data-tip="View WishList">
                  <button className="btn text-cyan-600 bg-white hover:text-slate-800 text-xl">
                    <BsEyeFill />
                  </button>
                </div>
              </Link>
            )}
            <ReadList id={id as string} />
          </div>
        </div>
      </div>
    </div>
  );
}
