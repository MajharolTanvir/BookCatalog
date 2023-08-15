import { Key } from "react";

export interface IBook {
  id: Key | null | undefined;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  addedBy: string;
  year: number
}


export interface ICredential {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password?: string;
}

export interface ILoginResponse {
  email: string;
  password: string;
}

export interface IReview {
  id: string;
  email: string;
  reviewText: string;
}

