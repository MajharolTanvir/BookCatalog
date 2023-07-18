export interface IBook {
  id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  addedBy: string;
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