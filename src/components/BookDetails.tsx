/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {  Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteBookMutation,
  useGetSingleBookQuery,
} from "../redux/features/bookSlice.ts/BookApi";
import Loading from "./Loading";
import Swal from "sweetalert2";
import AddReview from "./AddReview";
import { useGetAllReviewsQuery } from "../redux/features/ReviewApi";
import { IBook, IReview } from "../Types/GlobalTypes";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { useAppSelector } from "../redux/hook";
import { IUserState } from "../redux/features/auth/userSlice";

export default function BookDetails() {
  const { id } = useParams();
    const { user } = useAppSelector(
      (state: { user: IUserState }) => state.user
    );
  const { data, isLoading } = useGetSingleBookQuery(id);
  const [deleteBook, { isLoading: deleteLoading }] = useDeleteBookMutation();
  const { data: reviews, isLoading: reviewLoading } = useGetAllReviewsQuery(id);

  const navigate = useNavigate();

  if (
    isLoading ||
    deleteLoading ||
    reviewLoading
  ) {
    return <Loading />;
  }

  const book: IBook = data?.data;
  const { title, author, genre, publicationDate, addedBy } = book;


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
