"use server";

import Prisma from "@prisma/client";

export type User = Prisma.User;

export type name = User["name"];
export type id = User["id"];
export type email = User["email"];
export type emailVerified = User["emailVerified"];
export type image = User["image"];
export type role = User["role"];
export type restricted = User["restricted"];
export type createdAt = User["createdAt"];
export type updatedAt = User["updatedAt"];

export interface SelectUser {
    userId: id;
}

export interface UpdateUserType {
    userId: id;
    data: {
        name?: name;
        email?: email;
        emailVerified?: emailVerified;
        image?: image;
        role?: role;
        restricted?: restricted;
        createdAt?: createdAt;
        updatedAt?: updatedAt;
    };
}

export interface ReturnUserType {
    id: id;
    name: name;
    email: email;
    emailVerified: emailVerified;
    image: image;
    role: role;
    restricted: restricted;
    createdAt: createdAt;
    updatedAt: updatedAt;
}
