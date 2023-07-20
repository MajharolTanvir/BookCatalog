/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import Swal from "sweetalert2";
import Loading from "../components/Loading";
import {
  useGetReadListQuery,
  useUpdateReadListMutation,
} from "../redux/features/ReadList/ReadLitApi";
import { useAppSelector } from "../redux/hook";

export default function ReadListData() {
  const { user } = useAppSelector((state: { user: any }) => state.user);
  const { data, isLoading } = useGetReadListQuery(`email=${user.email}`);
  const [updateReadList, { isLoading: updateLoading, isSuccess }] =
    useUpdateReadListMutation();

  const readListCHandler = (id: string, status: boolean) => {
    const options = {
      id: id,
      data: {
        reading: status,
        finish: false,
        readSoon: false,
      },
    };
    void updateReadList(options);
  };

  const readSoonListHandler = (id: string, status: boolean) => {
    const options = {
      id: id,
      data: {
        readSoon: status,
        reading: false,
        finish: false,
      },
    };
    void updateReadList(options);
  };

  const finishedHandler = (id: string, status: boolean) => {
    const options = {
      id: id,
      data: {
        finish: status,
        readSoon: false,
        reading: false,
      },
    };
    void updateReadList(options);
  };

  if (isLoading || updateLoading) {
    return <Loading />;
  }

  if (isSuccess) {
    void Swal.fire({
      title: "Successfull",
      text: "ReadList update",
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
    });
  }

  return (
    <div className="my-10 container md:h-screen mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3">
        {data?.data?.map(
          (readList: {
            id: {
              title: string;
              author: string;
              genre: string;
              publicationDate: string;
            };
            reading: boolean;
            _id: string;
            readSoon: boolean;
            finish: boolean;
          }) => (
                  <div className="card w-96 bg-base-100 shadow-xl my-4">
              <div className="card-body">
                <h2 className="card-title">Title: {readList?.id?.title}</h2>
                <p>Author: {readList?.id?.author}</p>
                <p>Genre: {readList?.id?.genre}</p>
                <p>Publish: {readList?.id?.publicationDate}</p>
                <div className="card-actions justify-center my-2  border-t-2 border-slate-300">
                  <div className="mt-3">
                    <div className=" flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={readList?.reading}
                        onClick={() =>
                          readListCHandler(readList?._id, !readList?.reading)
                        }
                      />
                      <span>Reading</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className=" flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={readList?.readSoon}
                        onClick={() =>
                          readSoonListHandler(
                            readList?._id,
                            !readList?.readSoon
                          )
                        }
                      />
                      <span>Read soon</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="checkbox "
                        checked={readList?.finish}
                        onClick={() =>
                          finishedHandler(readList?._id, !readList?.finish)
                        }
                      />
                      <span>Finished</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
