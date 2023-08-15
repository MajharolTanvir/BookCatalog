/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ChangeEvent, useState } from "react";
import BookCard from "../components/BookCard";
import Loading from "../components/Loading";
import {
  useGetAllBooksQuery,
  useGetFilterBookQuery,
  useGetSearchBookQuery,
} from "../redux/features/bookSlice.ts/BookApi";
import { IBook } from "../Types/GlobalTypes";

export default function Books() {
  let bookData = null;
  const [searchText, setSearchText] = useState("");
  const [selectGenre, setSelectGenre] = useState("");
  const [selectYear, setSelectYear] = useState("");
  const { data, isLoading } = useGetAllBooksQuery(undefined);
  const { data: searchData, isLoading: searchLoading } = useGetSearchBookQuery(
    `searchTerm=${searchText}`
  );

  const { data: filterData, isLoading: filterLoading } = useGetFilterBookQuery(
    `genre=${selectGenre}&year=${selectYear}`
  );

  bookData = searchData;

  if (selectGenre && selectYear) {
    bookData = filterData;
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleYear = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectYear(e.target.value);
  };

  const handleGenre = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectGenre(e.target.value);
  };

  if (isLoading || searchLoading || filterLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto">
      <div className="mt-10 md:flex md:justify-center">
        <div className="w-full md:w-[600px] py-2">
          <div className="join md:flex justify-center">
            <div>
              <input
                className="input border border-cyan-500 focus:border-none join-item"
                placeholder="Search..."
                onChange={handleSearch}
              />
            </div>
            <select
              onChange={handleGenre}
              className="select border border-cyan-500 join-item"
            >
              <option className="my-2" disabled selected>
                All Genre
              </option>
              {data?.data?.map((book: IBook) => (
                <option className="my-2">{book.genre}</option>
              ))}
            </select>
            <select
              onChange={handleYear}
              className="select border border-cyan-500 join-item"
            >
              <option className="my-2" disabled selected>
                All Year
              </option>
              {data?.data?.map((book: IBook) => (
                <option className="my-2">{book.year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 py-5 mx-auto">
        {bookData?.data?.map((book: IBook) => (
          <BookCard book={book} key={book.id} />
        ))}
      </div>
    </div>
  );
}
