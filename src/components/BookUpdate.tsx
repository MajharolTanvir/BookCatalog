/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from "../redux/features/bookSlice.ts/BookApi";
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
  publicationDate: string;
}

export default function BookUpdate() {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id);
  const [updateBook, { isLoading: updateLoading, isSuccess }] =
    useUpdateBookMutation();
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const option = {
      id: id,
      data: {
        title: data.title,
        author: data.author,
        genre: data.genre,
        publicationData: data.publicationDate,
      },
    };
    void updateBook(option);
  };

  const book: IBook = data?.data;
  const { title, author, genre, publicationDate } = book;


    if (isLoading || updateLoading) {
      return <Loading />;
    }


  if (isSuccess) {
    navigate(`/book-details/${id}`)
  }

  return (
    <div className="container mx-auto md:h-screen md:flex md:justify-center md:items-center">
      <div className="card card-side bg-base-100 shadow-xl gap-10 flex-col lg:flex-row p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="label">
            <span className="label-text">Title: {title}</span>
          </label>
          <input
            className="input input-bordered w-full max-w-xs"
          defaultValue={title}
            {...register("title")}
          />
          <label className="label">
            <span className="label-text">Author: {author}</span>
          </label>

          <input
            className="input input-bordered w-full max-w-xs"
          defaultValue={author}
            {...register("author")}
          />
          <label className="label">
            <span className="label-text">Genre: {genre}</span>
          </label>
          <input
            className="input input-bordered w-full max-w-xs"
          defaultValue={genre}
            {...register("genre")}
          />
          <label className="label">
            <span className="label-text">Publish: {publicationDate}</span>
          </label>
          <input
            className="input input-bordered w-full max-w-xs"
            type="date"
          defaultValue={publicationDate}
            {...register("publicationDate")}
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
