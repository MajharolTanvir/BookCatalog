/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import BookCard from "../components/BookCard";
import Loading from "../components/Loading";
import { useGetAllBooksQuery } from "../redux/features/bookSlice.ts/BookApi";
import { IBook } from "../Types/GlobalTypes";

export default function Books() {
  const { data, isLoading } = useGetAllBooksQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto">
      <div className="mt-10 flex justify-center">
        <div className="w-[600px]">
          <div className="join md:flex justify-center">
            <div>
              <input
                className="input border border-cyan-500 focus:border-none join-item"
                placeholder="Search..."
              />
            </div>
            <select className="select border border-cyan-500 join-item">
              <option className="my-2" disabled selected>
                Category
              </option>
              <option className="my-2">Genre</option>
              <option>Publication year</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 py-5 mx-auto">
        {data?.data?.map((book: IBook) => (
          <BookCard book={book} key={book.id} />
        ))}
      </div>
    </div>
  );
}
