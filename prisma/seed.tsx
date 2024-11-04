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
        [
            "Tarte",
            "tarte",
            "Delicious pie",
            ["Dessert"],
            ["Déjeuner", "Dîner", "Goûter"],
            "2f2cb76b-9438-11ef-ad19-d8bbc1515316",
            45,
        ],
        [
            "Lentilles",
            "lentilles",
            "Delicious lentilles",
            ["Plat"],
            ["Déjeuner", "Dîner"],
            "2f2cb76b-9438-11ef-ad19-d8bbc1515316",
            60,
        ],
        [
            "Pâtes",
            "pates",
            "Delicious pâtes",
            ["Plat"],
            ["Déjeuner", "Dîner"],
            "2f2cb76b-9438-11ef-ad19-d8bbc1515316",
            30,
        ],
        [
            "Riz",
            "riz",
            "Delicious riz",
            ["Plat"],
            ["Déjeuner", "Dîner"],
            "2f2cb76b-9438-11ef-ad19-d8bbc1515316",
            20,
        ],
        [
            "Poulet",
            "poulet",
            "Delicious poulet",
            ["Plat"],
            ["Déjeuner", "Dîner"],
            "2f2cb76b-9438-11ef-ad19-d8bbc1515316",
            45,
        ],
        [
            "Poisson",
            "poisson",
            "Delicious poisson",
            ["Plat"],
            ["Déjeuner", "Dîner"],
            "2f2cb76b-9438-11ef-ad19-d8bbc1515316",
            30,
        ],
        [
            "Tiramisu",
            "tiramisu",
            "Delicious tiramisu",
            ["Dessert"],
            ["Déjeuner", "Dîner", "Goûter", "Snack"],
            "2f2cb76b-9438-11ef-ad19-d8bbc1515316",
            45,
        ],
        [
            "Pot au feu",
            "pot-au-feu",
            "Delicious pot au feu",
            ["Plat"],
            ["Déjeuner", "Dîner"],
            "2f2cb76b-9438-11ef-ad19-d8bbc1515316",
            120,
        ],
        [
            "Chat à la crème",
            "chat-a-la-creme",
            "Delicious chat à la crème",
            ["Plat"],
            ["Déjeuner", "Dîner"],
            "2f2cb76b-9438-11ef-ad19-d8bbc1515316",
            90,
        ],
        [
            "Chat en lasagne",
            "chat-en-lasagne",
            "Delicious chat en lasagne",
            ["Plat"],
            ["Déjeuner", "Dîner"],
            "2f2cb76b-9438-11ef-ad19-d8bbc1515316",
            60,
        ],
        [
            "Chat en brochette",
            "chat-en-brochette",
            "Delicious chat en brochette",
            ["Plat"],
            ["Déjeuner", "Dîner"],
            "2f2cb76b-9438-11ef-ad19-d8bbc1515316",
            30,
        ],
        [
            "Chat en papillote",
            "chat-en-papillote",
            "Delicious chat en papillote",
            ["Plat"],
            ["Déjeuner", "Dîner"],
            "2f2cb76b-9438-11ef-ad19-d8bbc1515316",
            45,
        ],
        [
            "Chat en croute",
            "chat-en-croute",
            "Delicious chat en croute",
            ["Plat"],
            ["Déjeuner", "Dîner"],
            "2f2cb76b-9438-11ef-ad19-d8bbc1515316",
            60,
        ],
        [
            "Chat en salade",
            "chat-en-salade",
            "Delicious chat en salade",
            ["Plat"],
            ["Déjeuner", "Dîner"],
            "2f2cb76b-9438-11ef-ad19-d8bbc1515316",
            30,
        ],
        [
            "Pisse de chat",
            "pisse-de-chat",
            "Delicious pisse de chat",
            ["Boisson"],
            ["Déjeuner", "Dîner"],
            "2f2cb76b-9438-11ef-ad19-d8bbc1515316",
            5,
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
        console.log("Recipes created successfully : ", recipe[0]);
    }
}

main();
