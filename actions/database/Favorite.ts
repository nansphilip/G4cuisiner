"use server";

import Prisma from "@lib/prisma";

export async function fetchUserFavorites(userId: string) {
    const userWithFavorites = await Prisma.user.findUnique({
        where: { id: userId },
        include: { Favorite: { include: { favoriteUsers: true } } }, // Incluez les utilisateurs favoris
    });

    if (!userWithFavorites) {
        throw new Error(`User with id ${userId} not found.`);
    }

    // Vérifiez si Favorite est défini et contient des recettes
    if (!userWithFavorites.Favorite || userWithFavorites.Favorite.length === 0) {
        return []; // Si pas de favoris, retourner un tableau vide
    }

    return userWithFavorites.Favorite.map(favorite => ({
        id: favorite.id,
        title: favorite.title, // Accéder directement au titre de la recette
        slug: favorite.slug,
    }));
}

export async function addFavorite(userId: string, recipeSlug: string) {
    const user = await Prisma.user.findUnique({
        where: { id: userId },
    });
    const recipe = await Prisma.recipe.findUnique({
        where: { slug: recipeSlug },
    });

    if (!user || !recipe) {
        throw new Error('Utilisateur ou recette introuvable');
    }

    await Prisma.user.update({
        where: { id: userId },
        data: {
            Favorite: {
                connect: { id: recipe.id },
            },
        },
    });
}

export async function removeFavorite(userId: string, recipeSlug: string) {
    const user = await Prisma.user.findUnique({
        where: { id: userId },
    });
    const recipe = await Prisma.recipe.findUnique({
        where: { slug: recipeSlug },
    });

    if (!user || !recipe) {
        throw new Error('Utilisateur ou recette introuvable');
    }

    await Prisma.user.update({
        where: { id: userId },
        data: {
            Favorite: {
                disconnect: { id: recipe.id },
            },
        },
    });
}