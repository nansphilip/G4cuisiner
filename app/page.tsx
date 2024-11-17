import { SelectLastRecipe } from "@actions/database/Recipe";
import Image from "next/image";
import { SelectFavoriteRecipeUser } from "@actions/database/Favorite";
import { getSession } from "@lib/auth";
import Button from "@comps/server/button";
import FavoriteDisplayClient from "@comps/client/favorite-display";
import RecipeImageListClient from "@comps/client/image-listing";

export default async function HomePage() {
    const session = await getSession();

    const lastRecipeList = await SelectLastRecipe({limit: 3});
    const userFavoriteList = session && (await SelectFavoriteRecipeUser(session.user.id));

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
                    <Image src={"/logo-4.png"} height={250} width={250} alt="logo" />
                </div>
                <div className="flex w-full flex-row flex-wrap justify-center gap-3">
                    {userFavoriteList && userFavoriteList.length > 0 ? (
                        <>
                            {userFavoriteList.length > 0 &&
                                userFavoriteList.map(({title, slug, description, imageList}, index) => (
                                    <div
                                        key={index}
                                        className="w-[300px] flex-col rounded-lg bg-white p-4 shadow-md transition-all duration-150 hover:shadow-lg"
                                    >
                                        <div className="mb-2 flex flex-row items-center justify-between text-2xl font-bold">
                                            <span>{title}</span>
                                            <FavoriteDisplayClient userFavorite={true} classSvg="size-8" />
                                        </div>
                                        <div className="relative w-full">
                                            <RecipeImageListClient isHomePage={true} imageList={imageList} />
                                        </div>
                                        <div className="mt-2 w-full">
                                            <p className="m-2 w-full text-xs">{description}</p>
                                        </div>
                                        <div className="mt-2 flex flex-col items-center justify-between">
                                            <Button
                                                type="link"
                                                href={`/recipe/${slug}`}
                                                className="bg-primary font-bold text-tertiary shadow-md hover:bg-orange-300"
                                            >
                                                Voir la recette
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                        </>
                    ) : (
                        <>
                            {lastRecipeList ? (
                                lastRecipeList.map(({title, slug, imageList}, index) => (
                                    <div
                                        key={index}
                                        className="w-[300px] flex-col rounded-lg bg-white p-4 shadow-md transition-all duration-150 hover:shadow-lg"
                                    >
                                        <div className="mb-2 flex flex-row items-center justify-between text-2xl font-bold">
                                            <span>{title}</span>
                                        </div>
                                        <div className="relative w-full">
                                            <RecipeImageListClient isHomePage={true} imageList={imageList} />
                                        </div>
                                        <div className="mt-2 flex flex-col items-center justify-between">
                                            <Button
                                                type="link"
                                                href={`/recipe/${slug}`}
                                                className="bg-primary font-bold text-tertiary shadow-md hover:bg-orange-300"
                                            >
                                                Voir la recette
                                            </Button>
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
