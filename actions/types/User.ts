"use server";

export interface IdUserType {
  userId: string;
}

export interface UpdateUserRestrictionType {
  userId: string;
  restricted: boolean;
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

export interface UserRoleSelectProps {
  initialRole: "USER" | "MODO" | "ADMIN";
  userId: string;
};