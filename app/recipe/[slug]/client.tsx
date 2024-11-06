"use client";

import React, {useState} from "react";
import RecipeCard from "@comps/server/recipe-card";
import IngredientList from "@comps/server/ingredient";
import QuantityButton from "@comps/client/quantity-button";
import Rating from "@comps/client/rating-recipe";
import RecipeSteps from "@comps/client/recipe-steps";
import Favorite from "@comps/client/favorite";
import RatingNode from "@comps/client/rating";

type RecipeClientProps = {
    recipe: { title: string; image: string; description: string; slug: string; steps: RecipeSteps[] };
    ingredients: any[];
    userId: string;
};

const RecipeClient  : React.FC<RecipeClientProps> = ({recipe, ingredients, userId}) => {
    console.log(userId);
    const [quantity, setQuantity] = useState<number>(1);
    const [rating, setRating] = useState<number>(0);

    const handleRating = (newRating: number) => {
        setRating(newRating);
        console.log(`Nouvelle note : ${newRating}`); // Remplacez ceci par votre logique d'enregistrement
    };

    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);
        console.log(`Nouvelle quantité: ${newQuantity}`);
    };


    return (
        <div className="flex flex-col items-baseline gap-8 h-full w-full">
            <div className="flex flex-row flex-wrap items-center justify-center gap-8">
                <p className="font-bold">Recipe</p>
                <p>{"->"}</p>
                <p>{recipe.title}</p>
                <p>{"->"}</p>
                <p>{recipe.description}</p>
            </div>
            <div>
                <h1 className="flex text-5xl font-bold">{recipe.title}</h1>
                <Favorite userId={userId} slugRecipe={recipe.slug}/>
                <span className="flex text-2xl font-bold">Temps de préparation : </span>
                <span className="flex text-2xl font-bold">Difficulté : </span>
            </div>
            <div>
                <Rating rating={2}/>
            </div>
            <div className="flex flex-row flex-wrap items-center justify-center gap-4">
                <RecipeCard recipeName={recipe.title} recipeImageUrl={recipe.image}/>
            </div>
            <div>
                <QuantityButton initialQuantity={quantity}
                                onChange={handleQuantityChange}/> {/* Utilisation du bouton de quantité */}
            </div>
            <div className="flex flex-row flex-wrap items-center justify-center gap-4">
                <IngredientList ingredients={ingredients}/>
            </div>
            <div className="flex w-full rounded border">
                <h2 className="font-bold">Description :</h2>
                <p>{recipe.description}</p>
            </div>
            <div className="">
                <RecipeSteps steps={recipe.steps}/>
            </div>
            <div>
                <Rating rating={rating} onRate={handleRating} />
            </div>
        </div>
    );
};

export default RecipeClient;