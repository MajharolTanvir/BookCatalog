/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import Loading from "../components/Loading";

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const { user, isLoading } = useAppSelector((state: { user: any; }) => state.user);

  const { pathname } = useLocation();

  if (isLoading) {
    return <Loading />
  }

  if (!user.email) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  return children;
}
