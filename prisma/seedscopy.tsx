import Prisma from "@lib/prisma";

async function findlunchTypesByName(name: string) {
    const lunchStep = await Prisma.lunchType.findUnique({
        where: { name },
    });
    if (!lunchStep) {
        throw new Error(`LunchType "${name}" not found`);
    }
    return lunchStep;
}

async function findlunchStepsByName(name: string) {
    const lunchStep = await Prisma.lunchStep.findUnique({
        where: { name },
    });
    if (!lunchStep) {
        throw new Error(`LunchStep "${name}" not found`);
    }
    return lunchStep;
}

async function main() {
    const lunchTypesNames = [
        "Petit-déjeuner",
        "Déjeuner",
        "Brunch",
        "Dîner",
        "Goûter",
        "Snack",
        "Boisson",
    ];
    const lunchStepsNames = ["Entrée", "Plat", "Dessert", "Apéritif"];

    const lunchTypes = await Promise.all(
        lunchTypesNames.map((name) => findlunchTypesByName(name))
    );

    const lunchStep = await Promise.all(
        lunchStepsNames.map((name) => findlunchStepsByName(name))
    );

    const recipes = [
        [
            "Pancakes",
            "pancakes",
            "Delicious pancakes",
            ["Dessert"],
            ["Petit-déjeuner", "Brunch", "Goûter", "Snack"],
            "2f2cb76b-9438-11ef-ad19-d8bbc1515316",
            30,
        ],
        ["Pizza", "pizza", "Delicious pizza", ["Plat"], ["Déjeuner", "Dîner"]],
    ];

    const recipe = await Prisma.recipe.create({
        data: {
            title: "Pancakes",
            slug: "pancakes",
            description: "Delicious pancakes",
            lunchStep: {
                connect: [
                    {
                        id: lunchStep.find((step) => step.name === "Dessert")!
                            .id,
                    },
                ],
            },
            lunchType: {
                connect: [
                    {
                        id: lunchTypes.find(
                            (type) => type.name === "Petit-déjeuner"
                        )!.id,
                    },
                    {
                        id: lunchTypes.find((type) => type.name === "Brunch")!
                            .id,
                    },
                    {
                        id: lunchTypes.find((type) => type.name === "Goûter")!
                            .id,
                    },
                    {
                        id: lunchTypes.find((type) => type.name === "Snack")!
                            .id,
                    },
                ],
            },
            user: {
                connect: { id: "2f2cb76b-9438-11ef-ad19-d8bbc1515316" },
            },
            preparationTime: 30,
        },
    });
}

main();
