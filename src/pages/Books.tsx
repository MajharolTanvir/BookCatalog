import { useEffect, useState } from "react"
import BookDetails from "../components/BookDetails";

export default function Books() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    void fetch("./data.json")
      .then((res) => res.json())
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      .then((data) => setBooks(data));
  }, []);
  
  console.log(books)


  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 py-5 mx-auto">
        {books?.map((book) => (
          <BookDetails book={book}></BookDetails>
        ))}
      </div>
    </div>
  );
}
