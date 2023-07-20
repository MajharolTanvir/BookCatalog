/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Link, useNavigate, useParams } from "react-router-dom";
import { GiSelfLove } from "react-icons/gi";
import { BsEyeFill } from "react-icons/bs";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import {
  useDeleteBookMutation,
  useGetSingleBookQuery,
} from "../redux/features/bookSlice.ts/BookApi";
import Loading from "./Loading";
import Swal from "sweetalert2";
import { useAppSelector } from "../redux/hook";
import AddReview from "./AddReview";
import { useGetAllReviewsQuery } from "../redux/features/ReviewApi";
import { IBook, IReview } from "../Types/GlobalTypes";
import {
  useAddWishlistMutation,
  useGetSingleWishlistQuery,
} from "../redux/features/wishlist/WishlistApi";
import { useEffect, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import ReadList from "./ReadList";

export default function BookDetails() {
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

  const { data: wishlist, isLoading: singleLoading } =
    useGetSingleWishlistQuery({ id: id, email: user?.email });
  const { data, isLoading } = useGetSingleBookQuery(id);
  const [deleteBook, { isLoading: deleteLoading }] = useDeleteBookMutation();
  const { data: reviews, isLoading: reviewLoading } = useGetAllReviewsQuery(id);

  const [
    addWishList,
    { isLoading: wishlistLoading, isError, isSuccess, error },
  ] = useAddWishlistMutation(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (isError && error) {
      const customError = error as CustomError;
      if (customError.data) {
        setErrorMessage(customError.data.message);
      }
    }
  }, [isError, error]);

  if (
    isLoading ||
    deleteLoading ||
    reviewLoading ||
    wishlistLoading ||
    singleLoading
  ) {
    return <Loading />;
  }

  const book: IBook = data?.data;
  const { title, author, genre, publicationDate, addedBy } = book;

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
      title: "Successfull",
      text: "WishList added",
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

  const handleDeleteBook = (id: string) => {
    void Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to delete this! ${id}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        void deleteBook(id);
        void Swal.fire("Deleted!", "Your file has been deleted.", "success");
        navigate(`/books`);
      }
    });
  };

  return (
    <div>
      <div className="container mx-auto md:flex md:justify-center md:items-center mt-5">
        <div className="card card-side bg-base-100 shadow-xl gap-10 flex-col lg:flex-row">
          <div className="card-body">
            <h2 className="card-title">Title: {title}</h2>
            <p>Author: {author}</p>
            <p>Genre: {genre}</p>
            <p>Publish: {publicationDate}</p>
            <div className="card-actions pt-5">
              {wishlist?.data?.email !== user.email && (
                <div className="tooltip" data-tip="WishList">
                  <button
                    onClick={handleWishlist}
                    className="btn bg-cyan-600 hover:bg-cyan-400 text-white hover:text-slate-800 text-xl"
                  >
                    <GiSelfLove />
                  </button>
                </div>
              )}
              {wishlist?.data?.email === user.email && (
                <Link to={`/wishlists`}>
                  <div className="tooltip" data-tip="View WishList">
                    <button className="btn bg-cyan-600 hover:bg-cyan-400 text-white hover:text-slate-800 text-xl">
                      <BsEyeFill />
                    </button>
                  </div>
                </Link>
              )}
              {user.email === addedBy && (
                <div className="card-actions">
                  <Link to={`/book-update/${id}`}>
                    <div className="tooltip" data-tip="Update book">
                      <button className="btn bg-cyan-600 hover:bg-cyan-400 text-white hover:text-slate-800 text-xl">
                        <AiFillEdit />
                      </button>
                    </div>
                  </Link>

                  <div className="tooltip" data-tip="Delete book">
                    <button
                      className="btn bg-cyan-600 hover:bg-cyan-400 text-white hover:text-slate-800 text-xl"
                      onClick={() => id && handleDeleteBook(id)}
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              )}
              <ReadList />
            </div>
          </div>
          <div className="card-body">
            <AddReview />
          </div>
        </div>
      </div>
      <div className="container mx-auto md:flex md:justify-center my-5">
        <div className="card bg-sky-300 shadow-xl gap-x-10 flex-col w-full md:w-[400px] lg:w-[800px]  p-10">
          <h6 className="text-xl font-semibold mb-2">See Reviews</h6>
          {reviews?.data?.map((review: IReview) => (
            <p className="font-medium" key={review.id}>
              {review?.reviewText}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
