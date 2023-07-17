/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
  import { Link, useParams } from "react-router-dom"
  import { useGetSingleBooksQuery } from "../redux/features/bookSlice.ts/BookApi";
  import Loading from "./Loading";

  export interface IBook {
    title: string;
    author: string;
    genre: string;
    publicationDate: string;
  }

  export default function BookDetails() {
    const { id } = useParams();
    const { data, isLoading } = useGetSingleBooksQuery(id);

    if (isLoading) {
      return <Loading />;
    }

    const book:IBook = data?.data

    const { title, author, genre, publicationDate} = book

    return (
      <div className="container mx-auto md:h-screen md:flex md:justify-center md:items-center">
        <div className="card card-side bg-base-100 shadow-xl gap-10 flex-col lg:flex-row">
          <div className="card w-full  md:w-[400px] bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Title: {title}</h2>
              <p>Author: {author}</p>
              <p>Genre: {genre}</p>
              <p>Publish: {publicationDate}</p>
              {/* <div className="card-actions pt-5">
                <Link to={`/book-details/:${id}`}>
                  <button className="btn bg-cyan-600 text-white hover:text-slate-900 hover:bg-cyan-400 w-full ">
                    View details
                  </button>
                </Link>
              </div> */}
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
