"use server";

export interface IdUserType {
  id: string;
}

export interface UserType {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: "USER" | "MODO" | "ADMIN";
  restricted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserFixtures {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: "USER" | "MODO" | "ADMIN";
  restricted: boolean;
}
