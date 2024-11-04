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

    const recipes: [
        string,
        string,
        string,
        string[],
        string[],
        string,
        number,
    ][] = [
        [
            "Pancakes",
            "pancakes",
            "Delicious pancakes",
            ["Dessert"],
            ["Petit-déjeuner", "Brunch", "Goûter", "Snack"],
            "2f2cb76b-9438-11ef-ad19-d8bbc1515316",
            30,
        ],
        [
            "Pizza",
            "pizza",
            "Delicious pizza",
            ["Plat"],
            ["Déjeuner", "Dîner"],
            "2f2cb76b-9438-11ef-ad19-d8bbc1515316",
            60,
        ],
        [
            "Salade",
            "salade",
            "Delicious salad",
            ["Entrée"],
            ["Déjeuner", "Dîner"],
            "2f2cb76b-9438-11ef-ad19-d8bbc1515316",
            15,
        ],
    ];

    for (const recipe of recipes) {
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
                        id: lunchStep.find((step) => step.name === stepName)!
                            .id,
                    })),
                },
                lunchType: {
                    connect: (recipe[4] as string[]).map((typeName) => ({
                        id: lunchTypes.find((type) => type.name === typeName)!
                            .id,
                    })),
                },
                userId: recipe[5],
                preparationTime: recipe[6],
            },
        });
    }
}

main();
