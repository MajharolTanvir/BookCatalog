import { Link } from "react-router-dom";
import { IBook } from "../Types/GlobalTypes";

interface BookProps {
  book: IBook;
}

export default function BookCard({ book }: BookProps) {
  const { id, title, author, genre, publicationDate } = book;
  
  return (
    <div className="card w-full md:w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Title: {title}</h2>
        <p>Author: {author}</p>
        <p>Genre: {genre}</p>
        <p>Publish: {publicationDate}</p>
        <div className="card-actions pt-5">
          <Link to={`/book-details/${id}`}>
            <button className="btn bg-cyan-600 text-white hover:text-slate-900 hover:bg-cyan-400 w-full ">
              View details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );}


