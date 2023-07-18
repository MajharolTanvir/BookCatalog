/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
  import { Link, useNavigate, useParams } from "react-router-dom"
  import {
    useDeleteBookMutation,
    useGetSingleBookQuery,
  } from "../redux/features/bookSlice.ts/BookApi";
  import Loading from "./Loading";
import Swal from "sweetalert2";
import { useAppSelector } from "../redux/hook";

export interface IBook {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  addedBy: string
}

export default function BookDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id);
  const [deleteBook, { isLoading: deleteLoading }] = useDeleteBookMutation();
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate()

  if (isLoading || deleteLoading) {
    return <Loading />;
  }


  const book: IBook = data?.data;

  console.log(book);

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
        navigate(`/books`)
      }
    });
  };

  return (
    <div className="container mx-auto md:h-screen md:flex md:justify-center md:items-center">
      <div className="card card-side bg-base-100 shadow-xl gap-10 flex-col lg:flex-row">
        <div className="card w-full  md:w-[400px] bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Title: {title}</h2>
            <p>Author: {author}</p>
            <p>Genre: {genre}</p>
            <p>Publish: {publicationDate}</p>
            {user.email === addedBy && (
              <div className="card-actions pt-5">
                <button className="btn bg-cyan-600 text-white hover:text-slate-900 hover:bg-cyan-400 w-[40%]">
                  <Link to={`/book-update/${id}`}>Edit book</Link>
                </button>

                <button
                  onClick={() => id && handleDeleteBook(id)}
                  className="btn bg-cyan-600 text-white hover:text-slate-900 hover:bg-cyan-400 w-[40%]"
                >
                  Delete book
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="card-body">
          <h2 className="card-title">New movie is released!</h2>
          <p>Click the button to watch on Jetflix app.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Watch</button>
          </div>
        </div>
      </div>
    </div>
  );
}
