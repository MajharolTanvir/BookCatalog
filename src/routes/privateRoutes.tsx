
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import Loading from "../components/Loading";

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const { user, isLoading } = useAppSelector((state) => state.user);

  const { pathname } = useLocation();

  if (isLoading) {
    return <Loading />
  }

  if (!user.email) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  return children;
}
