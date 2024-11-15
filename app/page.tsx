import { selectRecipesByCreateDate } from "@actions/database/Recipe";
import logo from "@public/logo.svg";
import Image from "next/image";
import { SelectRecipeUserFavorite } from "@actions/database/Favorite";
import { getSession } from "@lib/auth";
import ButtonClient from "@comps/client/button";
import FavoriteDisplayClient from "@comps/client/favorite-display";
import RecipeImageListClient from "@comps/client/image-listing";

export default async function HomePage() {
    const session = await getSession();

    const recipeList = await selectRecipesByCreateDate(3);
    const userFavoriteList = session && (await SelectRecipeUserFavorite(session.user.id));

    return (
        <>
            <div
                className="absolute left-0 top-0 -z-10 h-screen w-screen bg-cover bg-center"
                style={{
                    backgroundImage: "url('/background.jpg')",
                    opacity: 0.5,
                }}
            ></div>
            <div className="flex w-full flex-col items-center justify-center gap-2">
                <div className="flex justify-center">
                    <Image src={logo} height={250} width={250} alt="logo" />
                </div>
                <div className="flex w-full flex-row flex-wrap justify-center gap-3">
                    {userFavoriteList && userFavoriteList.length > 0 ? (
                        <>
                            {userFavoriteList.length > 0 &&
                                userFavoriteList.map((recipe, index) => (
                                    <div
                                        key={index}
                                        className="w-[300px] flex-col rounded-lg border border-gray-300 bg-white p-4 shadow-md transition-all duration-150 hover:shadow-lg"
                                    >
                                        <div className="mb-2 flex flex-row items-center justify-between text-2xl font-bold">
                                            <span>{recipe.title}</span>
                                            <FavoriteDisplayClient userFavorite={true} classSvg="size-8" />
                                        </div>
                                        <div className="relative w-full">
                                            <RecipeImageListClient isHomePage={true} imageList={recipe.images} />
                                        </div>
                                        <div className="mt-2 w-full">
                                            <p className="m-2 w-full text-xs">{recipe.description}</p>
                                        </div>
                                        <div className="mt-2 flex flex-col items-center justify-between">
                                            <ButtonClient
                                                type="link"
                                                href={`/recipe/${recipe.slug}`}
                                                // buttonSize="sm"
                                                className="border border-gray-400 bg-primary font-bold text-tertiary"
                                            >
                                                Voir la recette
                                            </ButtonClient>
                                        </div>
                                    </div>
                                ))}
                        </>
                    ) : (
                        <>
                            {recipeList.length > 0 ? (
                                recipeList.map((recipe) => (
                                    <div
                                        key={recipe.id}
                                        className="w-[300px] flex-col rounded-lg border border-gray-300 bg-white p-4 shadow-md transition-all duration-150 hover:shadow-lg"
                                    >
                                        <div className="mb-2 flex flex-row items-center justify-between text-2xl font-bold">
                                            <span>{recipe.title}</span>
                                        </div>
                                        <div className="relative w-full">
                                            <RecipeImageListClient isHomePage={true} imageList={recipe.images} />
                                        </div>
                                        <div className="mt-2 flex flex-col items-center justify-between">
                                            <ButtonClient
                                                type="link"
                                                href={`/recipe/${recipe.slug}`}
                                                buttonSize="sm"
                                                variant="outline"
                                                className="border bg-primary font-bold text-black"
                                            >
                                                Voir la recette
                                            </ButtonClient>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <span>Pas de recettes récentes disponibles.</span>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
