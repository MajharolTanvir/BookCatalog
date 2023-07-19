/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Loading from "../components/Loading";
import { useGetWishlistQuery } from "../redux/features/wishlist/WishlistApi";
import { useAppSelector } from "../redux/hook";

export default function Wishlists() {
  const { user } = useAppSelector((state) => state.user);
  const { data, isLoading } = useGetWishlistQuery(`email=${user.email}`);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="md:h-screen container mx-auto">
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {data?.data?.map((book: { title: string, genre: string, author: string, publicationDate: string}) => (
          <div className="">
            <div className="w-full md:w-96 bg-base-100 shadow-xl mt-5">
              <div className="card-body">
                <h2 className="card-title">Title: {book?.title} </h2>
                <p>Genre: {book.genre}</p>
                <p>Author: {book.author}</p>
                <p>Publish: {book.publicationDate}</p>
                <div className="card-actions justify-start mt-5">
                  <button className="btn bg-cyan-600 text-white hover:text-slate-900 hover:bg-cyan-400 w-[40%]">
                    Delete wishlist
                  </button>
                  <button className="btn bg-cyan-600 text-white hover:text-slate-900 hover:bg-cyan-400 w-[40%]">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
