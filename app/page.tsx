import { selectRecipesByCreateDate } from "@actions/database/Recipe";
import logo from "@public/logo.svg";
import Image from "next/image";
import { fetchUserFavorites } from "@actions/database/Favorite";
import { getSession } from "@lib/auth";
import ButtonClient from "@comps/client/button";
import FavoriteDisplayClient from "@comps/client/favorite-display";
import RecipeImageListClient from "@comps/client/image-listing";

export default async function HomePage() {
    const session = await getSession();

    const recipeList = await selectRecipesByCreateDate(3);
    const userFavoriteList =
        session && (await fetchUserFavorites(session.user.id));

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
                <div className="flex flex-col justify-center gap-2">
                    {userFavoriteList && userFavoriteList.length > 0 ? (
                        <>
                            <div className="mb-20 mt-4 flex">
                                {userFavoriteList.length > 0 ? (
                                    userFavoriteList.map((recipe, index) => (
                                        <div
                                            key={index}
                                            className="h-full flex-col rounded-lg border border-tertiary bg-white p-4 shadow-md transition-all duration-150 hover:shadow-lg"
                                        >
                                            <div className="flex flex-row items-center  justify-between text-2xl font-bold">
                                                <span>{recipe.title}</span>
                                                <FavoriteDisplayClient
                                                    userFavorite={true}
                                                    classSvg="size-8"
                                                />
                                            </div>
                                            <div className="relative w-full">
                                                <RecipeImageListClient
                                                    isHomePage={true}
                                                    imageList={recipe.images}
                                                />
                                            </div>
                                            <div className="mt-2 w-full">
                                                <p className="m-2 w-full text-xs">
                                                    {recipe.description}
                                                </p>
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
                                    ))
                                ) : (
                                    <span>
                                        Vous n&apos;avez pas encore de recette
                                        favorite.
                                    </span>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className="mb-4 text-2xl font-bold">
                                Recettes récentes
                            </h2>
                            <div className="mb-20 mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {recipeList.length > 0 ? (
                                    recipeList.map((recipe) => (
                                        <div
                                            key={recipe.id}
                                            className="flex h-full flex-col rounded-lg border border-tertiary bg-tertiary p-4 shadow-md transition-all duration-150 hover:shadow-lg"
                                        >
                                            {/*<div className="relative w-full">*/}
                                            {/*    <RecipeImageListClient isHomePage={true} imageList={recipe.images || []}/>*/}
                                            {/*</div>*/}
                                            <div className="relative h-40 w-64">
                                                {" "}
                                                {/* Conteneur plus petit */}
                                                <Image
                                                    src="/template.webp"
                                                    alt="Template Image"
                                                    height={160}
                                                    width={256}
                                                    className="size-full rounded-md object-cover"
                                                />
                                            </div>
                                            <div className="mt-2 flex flex-col items-center justify-between">
                                                <ButtonClient
                                                    type="link"
                                                    href="{`/recipe/${recipe.slug}`}"
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
                                    <span>
                                        Pas de recettes récentes disponibles.
                                    </span>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
