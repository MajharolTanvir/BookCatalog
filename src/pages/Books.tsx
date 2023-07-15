import { useEffect, useState } from "react"
import BookCard from "../components/BookCard";

export default function Books() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    void fetch("./data.json")
      .then((res) => res.json())
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      .then((data) => setBooks(data));
  }, []);
  
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
        {books?.map((book) => (
          <BookCard book={book}></BookCard>
        ))}
      </div>
    </div>
  );
}
