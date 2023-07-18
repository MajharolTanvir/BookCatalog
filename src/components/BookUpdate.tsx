/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleBookQuery, useUpdateBookMutation } from "../redux/features/bookSlice.ts/BookApi";
import Loading from "./Loading";

export interface IBook {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
}

interface IFormInput {
  title: string;
  author: string;
  genre: string;
  publicationData: string;
}

export default function BookUpdate() {
  const { id } = useParams();
    const { data, isLoading } = useGetSingleBookQuery(id);
    const [updateBook] = useUpdateBookMutation()
    const navigate = useNavigate()

  if (isLoading) {
    return <Loading />;
  }
    const { register, handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data, id) => {
        const option = {
            id: id,
            data: data
        }
        void updateBook(option);
        // navigate(`/book-details/${id}`);
    };

  const book: IBook = data?.data;
  const { title, author, genre, publicationDate } = book;

  return (
    <div className="container mx-auto md:h-screen md:flex md:justify-center md:items-center">
      <div className="card card-side bg-base-100 shadow-xl gap-10 flex-col lg:flex-row p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="label">
            <span className="label-text">Title: {title}</span>
          </label>
          <input
            className="input input-bordered w-full max-w-xs"
            {...register("title")}
          />
          <label className="label">
            <span className="label-text">Author: {author}</span>
          </label>

          <input
            className="input input-bordered w-full max-w-xs"
            {...register("author")}
          />
          <label className="label">
            <span className="label-text">Genre: {genre}</span>
          </label>
          <input
            className="input input-bordered w-full max-w-xs"
            {...register("genre")}
          />
          <label className="label">
            <span className="label-text">Publish: {publicationDate}</span>
          </label>
          <input
            className="input input-bordered w-full max-w-xs"
            type="date"
            {...register("publicationData")}
          />
          <input
            className="bg-cyan-600 text-white hover:text-slate-900 hover:bg-cyan-400 w-full py-2 rounded-md mt-5"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}
