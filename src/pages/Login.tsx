/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm, SubmitHandler } from "react-hook-form";
import { useUserLoginMutation } from "../redux/features/auth/userApi";
import { useEffect } from "react";
import Loading from "../components/Loading";

export interface ICredential {
    email: string,
    password: string
}

export interface ILoginResponse {
  name: string;
  email: string;
}

export default function Login() {
  const [userLogin, {isLoading,isSuccess, error, data}] = useUserLoginMutation()
  const { register, handleSubmit } = useForm<ICredential>();


  console.log(error)
  console.log(data)

  useEffect(() => {
    if (isSuccess && data) {
      const availableUser = localStorage.getItem("user");
      if (availableUser) {
        localStorage.removeItem("user");
      }
      const { name, email } = data.data;
      localStorage.setItem(
        "user",
        JSON.stringify({ name: name, email: email })
      );
    }
  }, [data, isSuccess]);


  if (isLoading) {
    return <Loading/>
  }

  const onSubmit: SubmitHandler<ICredential> = (data) => {
    const option: ICredential = {
      email: data.email,
      password: data.password,
    };

    console.log(option)
    void userLogin(option);
    // navigate(`/book-details/${id}`);
  };

  return (
    <div className="container mx-auto md:h-screen md:flex md:justify-center md:items-center">
      <div className="card card-side bg-base-100 shadow-xl gap-10 flex-col lg:flex-row p-5">
        <div>
          <div>
            <h4 className="text-xl md:text-2xl font-semibold text-center my-4">
              Login here
            </h4>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              className="input input-bordered w-full max-w-xs"
              type="email"
              {...register("email")}
            />
            <label className="label">
              <span className="label-text">Password</span>
            </label>

            <input
              className="input input-bordered w-full max-w-xs"
              type="password"
              {...register("password")}
            />
            <input
              className="bg-cyan-600 text-white max-w-xs hover:text-slate-900 hover:bg-cyan-400 w-full py-2 rounded-md mt-5"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
