import { IBook } from "../Types/GlobalTypes";

interface BookProps {
  book: IBook;
}

export default function BookDetails({ book }: BookProps) {
  return (
    <div className="card w-full md:w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{book?.title}</h2>
        <p>{book?.author}</p>
        <p>{book?.genre}</p>
        <div className="card-actions pt-5">
          <button className="btn btn-primary w-full">View details</button>
        </div>
      </div>
    </div>
  );
}
