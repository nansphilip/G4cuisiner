import Prisma from "@lib/prisma";
import { recipeData } from "./fixtures";

async function findLunchTypesByName(name: string) {
    const lunchStep = await Prisma.lunchType.findUnique({
        where: { name },
    });
    if (!lunchStep) {
        throw new Error(`LunchType "${name}" not found`);
    }
    return lunchStep;
}
async function findLunchStepsByName(name: string) {
    const lunchStep = await Prisma.lunchStep.findUnique({
        where: { name },
    });
    if (!lunchStep) {
        throw new Error(`LunchStep "${name}" not found`);
    }
    return lunchStep;
}

async function main() {
    const lunchTypesNames = ["Petit-déjeuner", "Déjeuner", "Brunch", "Dîner", "Goûter", "Snack", "Boisson"];
    const lunchStepsNames = ["Entrée", "Plat", "Dessert", "Apéritif"];

    const lunchTypes = await Promise.all(lunchTypesNames.map((name) => findLunchTypesByName(name)));
    const lunchStep = await Promise.all(lunchStepsNames.map((name) => findLunchStepsByName(name)));

    recipeData.forEach(async (recipe) => {
        const slug = recipe[0]
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "-");

        await Prisma.recipe.create({
            data: {
                title: recipe[0],
                slug: slug,
                description: recipe[2],
                lunchStep: {
                    connect: (recipe[3] as string[]).map((stepName) => ({
                        id: lunchStep.find((step) => step.name === stepName)!.id,
                    })),
                },
                lunchType: {
                    connect: (recipe[4] as string[]).map((typeName) => ({
                        id: lunchTypes.find((type) => type.name === typeName)!.id,
                    })),
                },
                userId: recipe[5],
                preparationTime: recipe[6],
            },
        });
        console.log("Recipes created successfully : ", recipe[0]);
    });
}

main();
