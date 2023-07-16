/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Slider from "../components/Slider";
import BookCard from "../components/BookCard";
import { IBook } from "../Types/GlobalTypes";
import { useGetAllBooksQuery } from "../redux/features/bookSlice.ts/BookApi";
import Loading from "../components/Loading";

export default function Home() {
  const { data, isLoading } = useGetAllBooksQuery(undefined);
  if (isLoading) {
  return <Loading/>
}

  return (
    <section>
      <Slider></Slider>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 py-5 mx-auto">
          {data?.data
            ?.slice(0, 10)
            .reverse()
            .map((book: IBook) => (
              <BookCard book={book} key={book.id}></BookCard>
            ))}
        </div>
      </div>
    </section>
  );
}
