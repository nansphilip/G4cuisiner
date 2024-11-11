import { AccountFixtures } from "@actions/types/Account";
import { FruitFixtures } from "@actions/types/Fruit";
import { IngredientFixtures } from "@actions/types/Ingredient";
import { RecipeFixtures } from "@actions/types/Recipe";
import { UserFixtures } from "@actions/types/User";

export const userData: UserFixtures[] = [
    {
        id: "user1-id",
        name: "Alice Dupont",
        email: "alice.dupont@example.com",
        emailVerified: true,
        image: null,
        role: "USER",
    },
    {
        id: "user2-id",
        name: "Bob Martin",
        email: "bob.martin@example.com",
        emailVerified: true,
        image: null,
        role: "USER",
    },
    {
        id: "user3-id",
        name: "Chloé Bernard",
        email: "chloe.bernard@example.com",
        emailVerified: true,
        image: null,
        role: "USER",
    },
    {
        id: "user4-id",
        name: "David Lambert",
        email: "david.lambert@example.com",
        emailVerified: true,
        image: null,
        role: "USER",
    },
    {
        id: "user5-id",
        name: "Emma Leroy",
        email: "emma.leroy@example.com",
        emailVerified: true,
        image: null,
        role: "USER",
    },
    {
        id: "user6-id",
        name: "François Moreau",
        email: "francois.moreau@example.com",
        emailVerified: true,
        image: null,
        role: "USER",
    },
    {
        id: "modo1-id",
        name: "Gabriel Rousseau",
        email: "gabriel.rousseau@example.com",
        emailVerified: true,
        image: null,
        role: "MODO",
    },
    {
        id: "modo2-id",
        name: "Hélène Fournier",
        email: "helene.fournier@example.com",
        emailVerified: true,
        image: null,
        role: "MODO",
    },
    {
        id: "admin1-id",
        name: "Isabelle Petit",
        email: "isabelle.petit@example.com",
        emailVerified: true,
        image: null,
        role: "ADMIN",
    },
    {
        id: "admin2-id",
        name: "Jean Dubois",
        email: "jean.dubois@example.com",
        emailVerified: true,
        image: null,
        role: "ADMIN",
    },
];

export const accountData: AccountFixtures[] = [
    {
        id: "account-user1-id",
        accountId: "user1-id",
        providerId: "credential",
        userId: "user1-id",
        password: "eb3841a40d9eca2bbc5314408aa2d9b5:3af534f79d7a7c59a7d2de8bcb246fe81c232ca80315c3eb563e37f34c8bb9fe9ca3ad456ccb0d303c815cf239cc7bebfe33352ee664e490bda95ceafd2fc9e7",
    },
    {
        id: "account-user2-id",
        accountId: "user2-id",
        providerId: "credential",
        userId: "user2-id",
        password: "eb3841a40d9eca2bbc5314408aa2d9b5:3af534f79d7a7c59a7d2de8bcb246fe81c232ca80315c3eb563e37f34c8bb9fe9ca3ad456ccb0d303c815cf239cc7bebfe33352ee664e490bda95ceafd2fc9e7",
    },
    {
        id: "account-user3-id",
        accountId: "user3-id",
        providerId: "credential",
        userId: "user3-id",
        password: "eb3841a40d9eca2bbc5314408aa2d9b5:3af534f79d7a7c59a7d2de8bcb246fe81c232ca80315c3eb563e37f34c8bb9fe9ca3ad456ccb0d303c815cf239cc7bebfe33352ee664e490bda95ceafd2fc9e7",
    },
    {
        id: "account-user4-id",
        accountId: "user4-id",
        providerId: "credential",
        userId: "user4-id",
        password: "eb3841a40d9eca2bbc5314408aa2d9b5:3af534f79d7a7c59a7d2de8bcb246fe81c232ca80315c3eb563e37f34c8bb9fe9ca3ad456ccb0d303c815cf239cc7bebfe33352ee664e490bda95ceafd2fc9e7",
    },
    {
        id: "account-user5-id",
        accountId: "user5-id",
        providerId: "credential",
        userId: "user5-id",
        password: "eb3841a40d9eca2bbc5314408aa2d9b5:3af534f79d7a7c59a7d2de8bcb246fe81c232ca80315c3eb563e37f34c8bb9fe9ca3ad456ccb0d303c815cf239cc7bebfe33352ee664e490bda95ceafd2fc9e7",
    },
    {
        id: "account-user6-id",
        accountId: "user6-id",
        providerId: "credential",
        userId: "user6-id",
        password: "eb3841a40d9eca2bbc5314408aa2d9b5:3af534f79d7a7c59a7d2de8bcb246fe81c232ca80315c3eb563e37f34c8bb9fe9ca3ad456ccb0d303c815cf239cc7bebfe33352ee664e490bda95ceafd2fc9e7",
    },
    {
        id: "account-modo1-id",
        accountId: "modo1-id",
        providerId: "credential",
        userId: "modo1-id",
        password: "1e466a9ea4625667b0afa37f37fb606f:6a004e13b58523fa9258b26607895bb15c28845cf4a216691572cd4cf4e5e518c516f525786cc4a0abce76ac68745c32258e998e8ad721ea6c6aefe8e263f4ef",
    },
    {
        id: "account-modo2-id",
        accountId: "modo2-id",
        providerId: "credential",
        userId: "modo2-id",
        password: "1e466a9ea4625667b0afa37f37fb606f:6a004e13b58523fa9258b26607895bb15c28845cf4a216691572cd4cf4e5e518c516f525786cc4a0abce76ac68745c32258e998e8ad721ea6c6aefe8e263f4ef",
    },
    {
        id: "account-admin1-id",
        accountId: "admin1-id",
        providerId: "credential",
        userId: "admin1-id",
        password: "572a76ee988aa5655d9365074f38bb4d:8d68bcf63ab0ab080794b4d2a4d66316c120913c81193d1a87be02f832aa0dc3cae646c87726953b78138ebac4a01014c13b2be6b85416e1341877d8f3c07844",
    },
    {
        id: "account-admin2-id",
        accountId: "admin2-id",
        providerId: "credential",
        userId: "admin2-id",
        password: "572a76ee988aa5655d9365074f38bb4d:8d68bcf63ab0ab080794b4d2a4d66316c120913c81193d1a87be02f832aa0dc3cae646c87726953b78138ebac4a01014c13b2be6b85416e1341877d8f3c07844",
    },
];

export const ingredientData: IngredientFixtures[] = [
    {
        id: "a08f99f8-9b9e-11ef-ad19-d8dbc1515316",
        name: "Cornichon",
        description: "Un petit concombre mariné dans du vinaigre.",
        image: "/ingredients/cornichon.webp",
    },
    {
        id: "b08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Tomate",
        description: "Un fruit rouge utilisé comme légume en cuisine.",
        image: "/ingredients/tomate.webp",
    },
    {
        id: "c08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Laitue",
        description: "Une salade verte croquante.",
        image: "/ingredients/laitue.webp",
    },
    {
        id: "d08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Œuf",
        description: "Œuf de poule utilisé dans de nombreuses recettes.",
        image: "/ingredients/oeuf.webp",
    },
    {
        id: "e08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Farine",
        description: "Farine de blé pour la pâtisserie et la cuisine.",
        image: "/ingredients/farine.webp",
    },
    {
        id: "f08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Beurre",
        description: "Produit laitier utilisé comme matière grasse.",
        image: "/ingredients/beurre.webp",
    },
    {
        id: "g08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Lait",
        description: "Lait de vache pour la cuisine.",
        image: "/ingredients/lait.webp",
    },
    {
        id: "h08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Sucre",
        description: "Substance douce utilisée pour sucrer les plats.",
        image: "/ingredients/sucre.webp",
    },
    {
        id: "i08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Fromage",
        description: "Produit laitier fermenté.",
        image: "/ingredients/fromage.webp",
    },
    {
        id: "j08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Oignon",
        description: "Légume bulbeux utilisé pour aromatiser les plats.",
        image: "/ingredients/oignon.webp",
    },
    {
        id: "k08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Vin rouge",
        description: "Vin utilisé pour cuisiner.",
        image: "/ingredients/vin-rouge.webp",
    },
    {
        id: "l08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Vin blanc",
        description: "Vin blanc sec pour la cuisine.",
        image: "/ingredients/vin-blanc.webp",
    },
    {
        id: "m08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Sel",
        description: "Assaisonnement de base.",
        image: "/ingredients/sel.webp",
    },
    {
        id: "n08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Poivre",
        description: "Épice utilisée pour relever le goût.",
        image: "/ingredients/poivre.webp",
    },
    {
        id: "o08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Bœuf",
        description: "Viande de bœuf pour les plats mijotés.",
        image: "/ingredients/boeuf.webp",
    },
    {
        id: "p08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Pâte brisée",
        description: "Pâte utilisée pour les tartes salées.",
        image: "/ingredients/pate-brisee.webp",
    },
    {
        id: "q08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Lardons",
        description: "Petits morceaux de lard fumé.",
        image: "/ingredients/lardons.webp",
    },
    {
        id: "r08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Crème fraîche",
        description: "Crème laitière épaisse.",
        image: "/ingredients/creme-fraiche.webp",
    },
    {
        id: "s08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Fromage râpé",
        description: "Fromage râpé pour gratiner.",
        image: "/ingredients/fromage-rape.webp",
    },
    {
        id: "t08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Bouillon de bœuf",
        description: "Bouillon préparé à partir de viande de bœuf.",
        image: "/ingredients/bouillon-de-boeuf.webp",
    },
    {
        id: "u08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Pain",
        description: "Pain de campagne ou baguette.",
        image: "/ingredients/pain.webp",
    },
    {
        id: "v08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Thon",
        description: "Poisson utilisé en boîte ou frais.",
        image: "/ingredients/thon.webp",
    },
    {
        id: "w08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Haricots verts",
        description: "Légumes verts longs et fins.",
        image: "/ingredients/haricots-verts.webp",
    },
    {
        id: "x08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Olives noires",
        description: "Olives mûres pour agrémenter les plats.",
        image: "/ingredients/olives-noires.webp",
    },
    {
        id: "y08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Anchois",
        description: "Petits poissons salés.",
        image: "/ingredients/anchois.webp",
    },
    {
        id: "z08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Poivron",
        description: "Légume coloré, rouge, vert ou jaune.",
        image: "/ingredients/poivron.webp",
    },
    {
        id: "aa08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Oignon rouge",
        description: "Oignon doux de couleur rouge.",
        image: "/ingredients/oignon-rouge.webp",
    },
    {
        id: "ab08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Vinaigrette",
        description: "Sauce à base d'huile et de vinaigre.",
        image: "/ingredients/vinaigrette.webp",
    },
    {
        id: "ac08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Carotte",
        description: "Légume racine orange.",
        image: "/ingredients/carotte.webp",
    },
    {
        id: "ad08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Champignon",
        description: "Champignons de Paris ou autres variétés.",
        image: "/ingredients/champignon.webp",
    },
    {
        id: "ae08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Ail",
        description: "Bulbe utilisé pour aromatiser.",
        image: "/ingredients/ail.webp",
    },
    {
        id: "af08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Bouquet garni",
        description: "Mélange d'herbes aromatiques.",
        image: "/ingredients/bouquet-garni.webp",
    },
    {
        id: "ag08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Huile d'olive",
        description: "Huile utilisée pour la cuisson et l'assaisonnement.",
        image: "/ingredients/huile-d-olive.webp",
    },
    {
        id: "ah08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Pomme",
        description: "Fruit utilisé dans les desserts.",
        image: "/ingredients/pomme.webp",
    },
    {
        id: "ai08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Pâte feuilletée",
        description: "Pâte légère pour les tartes et pâtisseries.",
        image: "/ingredients/pate-feuilletee.webp",
    },
    {
        id: "aj08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Cannelle",
        description: "Épice utilisée dans les desserts.",
        image: "/ingredients/cannelle.webp",
    },
    {
        id: "ak08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Pain de mie",
        description: "Pain moelleux utilisé pour les sandwichs.",
        image: "/ingredients/pain-de-mie.webp",
    },
    {
        id: "al08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Jambon",
        description: "Viande de porc cuite.",
        image: "/ingredients/jambon.webp",
    },
    {
        id: "am08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Sauce Béchamel",
        description: "Sauce blanche à base de lait.",
        image: "/ingredients/sauce-bechamel.webp",
    },
    {
        id: "an08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Aubergine",
        description: "Légume violet utilisé dans la ratatouille.",
        image: "/ingredients/aubergine.webp",
    },
    {
        id: "ao08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Courgette",
        description: "Légume vert allongé.",
        image: "/ingredients/courgette.webp",
    },
    {
        id: "ap08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Herbes de Provence",
        description: "Mélange d'herbes aromatiques sèches.",
        image: "/ingredients/herbes-de-provence.webp",
    },
    {
        id: "aq08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Levure chimique",
        description: "Agent levant pour la pâtisserie.",
        image: "/ingredients/levure-chimique.webp",
    },
    {
        id: "ar08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Zeste de citron",
        description: "Écorce de citron râpée.",
        image: "/ingredients/zeste-de-citron.webp",
    },
    {
        id: "as08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Vanille",

        description: "Arôme naturel pour les desserts.",
        image: "/ingredients/vanille.webp",
    },
    {
        id: "at08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Poulet",
        description: "Viande de volaille.",
        image: "/ingredients/poulet.webp",
    },
    {
        id: "au08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Muscade",
        description: "Épice utilisée pour aromatiser.",
        image: "/ingredients/muscade.webp",
    },
    {
        id: "av08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Zeste d'orange",
        description: "Écorce d'orange râpée.",
        image: "/ingredients/zeste-d-orange.webp",
    },
    {
        id: "aw08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Jus d'orange",
        description: "Jus extrait des oranges.",
        image: "/ingredients/jus-d-orange.webp",
    },
    {
        id: "ax08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Grand Marnier",
        description: "Liqueur à l'orange.",
        image: "/ingredients/grand-marnier.webp",
    },
];

export const recipeData: RecipeFixtures[] = [
    {
        id: "recipe1-id",
        title: "Quiche Lorraine",
        description: "Une délicieuse quiche à base de lardons et de crème fraîche.",
        numberOfServing: 6,
        preparationTime: 60,
        difficultyLevel: "MEDIUM",
        lunchType: "LUNCH",
        lunchStep: "MAIN",
        userId: "user2-id", // Bob Martin
        Image: [
            { url: "/recipes/quiche-lorraine-1.webp", alt: "Quiche Lorraine 1" },
            { url: "/recipes/quiche-lorraine-2.webp", alt: "Quiche Lorraine 2" },
        ],
        Favorite: [
            { favorite: true, userId: "user1-id" }, // Alice Dupont
            { favorite: false, userId: "user2-id" }, // Bob Martin
            { favorite: true, userId: "user3-id" }, // Chloé Bernard
            { favorite: true, userId: "modo1-id" }, // Gabriel Rousseau
            { favorite: false, userId: "admin1-id" }, // Isabelle Petit
        ],
        Review: [
            {
                review: "Je n'ai pas aimé du tout. La quiche était trop grasse et manquait de goût. Les proportions ne semblent pas correctes. Je ne recommanderais pas cette recette.",
                userId: "user1-id", // Alice Dupont
                thumbsPositive: ["user3-id", "modo1-id"],
                thumbsNegative: ["user2-id"],
            },
            {
                review: "Délicieuse recette, facile à faire et appréciée de tous.",
                userId: "admin1-id", // Isabelle Petit
                thumbsPositive: ["user2-id", "modo2-id"],
                thumbsNegative: [],
            },
        ],
        Rating: [
            { rating: 1, userId: "user1-id" },
            { rating: 4, userId: "user3-id" },
            { rating: 5, userId: "admin1-id" },
        ],
        Quantity: [
            {
                quantity: 1,
                unit: "PIECE",
                ingredientId: "p08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Pâte brisée
            },
            {
                quantity: 200,
                unit: "GRAM",
                ingredientId: "q08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Lardons
            },
            {
                quantity: 3,
                unit: "PIECE",
                ingredientId: "d08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Œuf
            },
            {
                quantity: 200,
                unit: "MILLILITER",
                ingredientId: "r08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Crème fraîche
            },
            {
                quantity: 100,
                unit: "GRAM",
                ingredientId: "s08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Fromage râpé
            },
        ],
    },
    {
        id: "recipe2-id",
        title: "Soupe à l'oignon",
        description: "Une soupe traditionnelle française aux oignons caramélisés.",
        numberOfServing: 4,
        preparationTime: 45,
        difficultyLevel: "EASY",
        lunchType: "DINNER",
        lunchStep: "STARTER",
        userId: "user3-id", // Chloé Bernard
        Image: [{ url: "/recipes/soupe-a-l-oignon-1.webp", alt: "Soupe à l'oignon 1" }],
        Favorite: [
            { favorite: true, userId: "user2-id" },
            { favorite: true, userId: "user1-id" },
            { favorite: false, userId: "admin2-id" },
        ],
        Review: [
            {
                review: "Parfaite pour les soirées d'hiver, un vrai régal.",
                userId: "user2-id",
                thumbsPositive: ["user1-id"],
                thumbsNegative: [],
            },
        ],
        Rating: [
            { rating: 5, userId: "user2-id" },
            { rating: 4, userId: "modo2-id" },
        ],
        Quantity: [
            {
                quantity: 500,
                unit: "GRAM",
                ingredientId: "j08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Oignon
            },
            {
                quantity: 50,
                unit: "GRAM",
                ingredientId: "f08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Beurre
            },
            {
                quantity: 20,
                unit: "GRAM",
                ingredientId: "e08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Farine
            },
            {
                quantity: 1,
                unit: "LITER",
                ingredientId: "t08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Bouillon de bœuf
            },
            {
                quantity: 4,
                unit: "PIECE",
                ingredientId: "u08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Pain
            },
            {
                quantity: 100,
                unit: "GRAM",
                ingredientId: "s08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Fromage râpé
            },
        ],
    },
    {
        id: "recipe3-id",
        title: "Crêpes Suzette",
        description: "Des crêpes fines servies avec une sauce au beurre et à l'orange.",
        numberOfServing: 4,
        preparationTime: 30,
        difficultyLevel: "MEDIUM",
        lunchType: "BREAKFAST",
        lunchStep: "DESSERT",
        userId: "user1-id", // Alice Dupont
        Image: [
            { url: "/recipes/crepes-suzette-1.webp", alt: "Crêpes Suzette 1" },
            { url: "/recipes/crepes-suzette-2.webp", alt: "Crêpes Suzette 2" },
            { url: "/recipes/crepes-suzette-3.webp", alt: "Crêpes Suzette 3" },
        ],
        Favorite: [
            { favorite: true, userId: "user2-id" },
            { favorite: true, userId: "modo1-id" },
            { favorite: false, userId: "admin2-id" },
        ],
        Review: [
            {
                review: "Une recette classique, toujours aussi délicieuse.",
                userId: "modo1-id",
                thumbsPositive: ["user1-id", "user3-id"],
                thumbsNegative: [],
            },
        ],
        Rating: [
            { rating: 5, userId: "user1-id" },
            { rating: 4, userId: "modo1-id" },
        ],
        Quantity: [
            {
                quantity: 200,
                unit: "GRAM",
                ingredientId: "e08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Farine
            },
            {
                quantity: 500,
                unit: "MILLILITER",
                ingredientId: "g08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Lait
            },
            {
                quantity: 3,
                unit: "PIECE",
                ingredientId: "d08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Œuf
            },
            {
                quantity: 50,
                unit: "GRAM",
                ingredientId: "f08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Beurre
            },
            {
                quantity: 50,
                unit: "GRAM",
                ingredientId: "h08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Sucre
            },
            {
                quantity: 1,
                unit: "PIECE",
                ingredientId: "av08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Zeste d'orange
            },
            {
                quantity: 100,
                unit: "MILLILITER",
                ingredientId: "aw08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Jus d'orange
            },
            {
                quantity: 50,
                unit: "MILLILITER",
                ingredientId: "ax08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Grand Marnier
            },
        ],
    },
    {
        id: "recipe4-id",
        title: "Salade Niçoise",
        description: "Une salade fraîche avec du thon, des œufs et des légumes croquants.",
        numberOfServing: 2,
        preparationTime: 20,
        difficultyLevel: "EASY",
        lunchType: "LUNCH",
        lunchStep: "MAIN",
        userId: "user2-id", // Bob Martin
        Image: [
            { url: "/recipes/salade-nicoise-1.webp", alt: "Salade Niçoise 1" },
            { url: "/recipes/salade-nicoise-2.webp", alt: "Salade Niçoise 2" },
        ],
        Favorite: [
            { favorite: true, userId: "user3-id" },
            { favorite: false, userId: "user1-id" },
            { favorite: true, userId: "modo2-id" },
        ],
        Review: [
            {
                review: "Très frais et savoureux. Parfait pour l'été.",
                userId: "user3-id",
                thumbsPositive: ["modo2-id"],
                thumbsNegative: [],
            },
        ],
        Rating: [
            { rating: 3, userId: "user1-id" },
            { rating: 4, userId: "user3-id" },
            { rating: 5, userId: "modo2-id" },
        ],
        Quantity: [
            {
                quantity: 100,
                unit: "GRAM",
                ingredientId: "v08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Thon
            },
            {
                quantity: 2,
                unit: "PIECE",
                ingredientId: "d08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Œuf
            },
            {
                quantity: 100,
                unit: "GRAM",
                ingredientId: "w08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Haricots verts
            },
            {
                quantity: 2,
                unit: "PIECE",
                ingredientId: "b08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Tomate
            },
            {
                quantity: 50,
                unit: "GRAM",
                ingredientId: "x08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Olives noires
            },
            {
                quantity: 50,
                unit: "GRAM",
                ingredientId: "y08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Anchois
            },
            {
                quantity: 1,
                unit: "PIECE",
                ingredientId: "c08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Laitue
            },
            {
                quantity: 50,
                unit: "MILLILITER",
                ingredientId: "ab08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Vinaigrette
            },
        ],
    },
    {
        id: "recipe5-id",
        title: "Bœuf Bourguignon",
        description: "Un ragoût de bœuf mijoté au vin rouge et aux champignons.",
        numberOfServing: 6,
        preparationTime: 180,
        difficultyLevel: "HARD",
        lunchType: "DINNER",
        lunchStep: "MAIN",
        userId: "user3-id", // Chloé Bernard
        Image: [{ url: "/recipes/boeuf-bourguignon-1.webp", alt: "Bœuf Bourguignon 1" }],
        Favorite: [
            { favorite: true, userId: "user1-id" },
            { favorite: false, userId: "user2-id" },
            { favorite: true, userId: "admin2-id" },
        ],
        Review: [
            {
                review: "Une recette intéressante mais un peu longue à préparer. Le résultat en valait la peine.",
                userId: "user1-id",
                thumbsPositive: ["user3-id"],
                thumbsNegative: [],
            },
            {
                review: "Un plat traditionnel très bien exécuté. La viande était tendre.",
                userId: "user3-id",
                thumbsPositive: ["user2-id", "admin2-id"],
                thumbsNegative: [],
            },
        ],
        Rating: [
            { rating: 5, userId: "user1-id" },
            { rating: 2, userId: "user2-id" },
            { rating: 4, userId: "admin2-id" },
        ],
        Quantity: [
            {
                quantity: 1,
                unit: "KILOGRAM",
                ingredientId: "o08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Bœuf
            },
            {
                quantity: 150,
                unit: "GRAM",
                ingredientId: "q08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Lardons
            },
            {
                quantity: 2,
                unit: "PIECE",
                ingredientId: "j08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Oignon
            },
            {
                quantity: 2,
                unit: "PIECE",
                ingredientId: "ac08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Carotte
            },
            {
                quantity: 250,
                unit: "GRAM",
                ingredientId: "ad08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Champignon
            },
            {
                quantity: 500,
                unit: "MILLILITER",
                ingredientId: "k08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Vin rouge
            },
            {
                quantity: 2,
                unit: "PIECE",
                ingredientId: "ae08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Ail
            },
            {
                quantity: 1,
                unit: "PIECE",
                ingredientId: "af08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Bouquet garni
            },
            {
                quantity: 30,
                unit: "MILLILITER",
                ingredientId: "ag08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Huile d'olive
            },
        ],
    },
    {
        id: "recipe6-id",
        title: "Tarte Tatin",
        description: "Une tarte aux pommes caramélisées à l'envers.",
        numberOfServing: 8,
        preparationTime: 90,
        difficultyLevel: "MEDIUM",
        lunchType: "DINNER",
        lunchStep: "DESSERT",
        userId: "user1-id", // Alice Dupont
        Image: [
            { url: "/recipes/tarte-tatin-1.webp", alt: "Tarte Tatin 1" },
            { url: "/recipes/tarte-tatin-2.webp", alt: "Tarte Tatin 2" },
        ],
        Favorite: [
            { favorite: true, userId: "user1-id" }, // Alice
            { favorite: true, userId: "user2-id" }, // Bob
            { favorite: true, userId: "user3-id" }, // Chloé
            { favorite: true, userId: "modo2-id" }, // Hélène Fournier
        ],
        Review: [
            {
                review: "Un dessert exceptionnel! La tarte Tatin était caramélisée à la perfection, avec des pommes fondantes et une pâte croustillante. C'est devenu un incontournable pour mes dîners.",
                userId: "user2-id", // Bob Martin
                thumbsPositive: ["user3-id", "modo1-id"],
                thumbsNegative: [],
            },
        ],
        Rating: [
            { rating: 2, userId: "user1-id" }, // Alice
            { rating: 4, userId: "user2-id" }, // Bob
            { rating: 5, userId: "user3-id" }, // Chloé
        ],
        Quantity: [
            {
                quantity: 1,
                unit: "PIECE",
                ingredientId: "ai08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Pâte feuilletée
            },
            {
                quantity: 6,
                unit: "PIECE",
                ingredientId: "ah08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Pomme
            },
            {
                quantity: 100,
                unit: "GRAM",
                ingredientId: "h08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Sucre
            },
            {
                quantity: 50,
                unit: "GRAM",
                ingredientId: "f08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Beurre
            },
            {
                quantity: 5,
                unit: "GRAM",
                ingredientId: "aj08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Cannelle
            },
        ],
    },
    {
        id: "recipe7-id",
        title: "Croque-Monsieur",
        description: "Un sandwich chaud au jambon et au fromage gratiné.",
        numberOfServing: 1,
        preparationTime: 15,
        difficultyLevel: "EASY",
        lunchType: "SNACK",
        lunchStep: "MAIN",
        userId: "user2-id", // Bob Martin
        Image: [{ url: "/recipes/croque-monsieur-1.webp", alt: "Croque-Monsieur 1" }],
        Favorite: [
            { favorite: true, userId: "user2-id" }, // Bob
            { favorite: true, userId: "user1-id" }, // Alice
            { favorite: true, userId: "user3-id" }, // Chloé
            { favorite: true, userId: "admin1-id" }, // Isabelle Petit
        ],
        Review: [
            {
                review: "J'adore ce sandwich! Le croque-monsieur est simple mais tellement bon. Le mélange de jambon et de fromage fondu est irrésistible. Idéal pour un repas rapide.",
                userId: "user3-id", // Chloé Bernard
                thumbsPositive: ["user1-id", "modo2-id"],
                thumbsNegative: [],
            },
        ],
        Rating: [
            { rating: 5, userId: "user2-id" }, // Bob
            { rating: 4, userId: "user1-id" }, // Alice
        ],
        Quantity: [
            {
                quantity: 2,
                unit: "PIECE",
                ingredientId: "ak08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Pain de mie
            },
            {
                quantity: 2,
                unit: "PIECE",
                ingredientId: "al08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Jambon
            },
            {
                quantity: 50,
                unit: "GRAM",
                ingredientId: "i08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Fromage
            },
            {
                quantity: 30,
                unit: "GRAM",
                ingredientId: "am08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Sauce Béchamel
            },
        ],
    },
    {
        id: "recipe8-id",
        title: "Ratatouille",
        description: "Un mélange de légumes mijotés, typique du sud de la France.",
        numberOfServing: 4,
        preparationTime: 60,
        difficultyLevel: "MEDIUM",
        lunchType: "DINNER",
        lunchStep: "MAIN",
        userId: "user3-id", // Chloé Bernard
        Image: [
            { url: "/recipes/ratatouille-1.webp", alt: "Ratatouille 1" },
            { url: "/recipes/ratatouille-2.webp", alt: "Ratatouille 2" },
            { url: "/recipes/ratatouille-3.webp", alt: "Ratatouille 3" },
        ],
        Favorite: [
            { favorite: false, userId: "user3-id" }, // Chloé
            { favorite: true, userId: "user1-id" }, // Alice
            { favorite: true, userId: "modo1-id" }, // Gabriel Rousseau
        ],
        Review: [
            {
                review: "C'est devenu mon plat préféré! La ratatouille est pleine de saveurs et rappelle les plats du sud de la France. Les légumes mijotés sont délicieux et c'est une recette saine que je referai souvent.",
                userId: "user1-id", // Alice Dupont
                thumbsPositive: ["user2-id", "modo1-id"],
                thumbsNegative: [],
            },
        ],
        Rating: [],
        Quantity: [
            {
                quantity: 2,
                unit: "PIECE",
                ingredientId: "an08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Aubergine
            },
            {
                quantity: 2,
                unit: "PIECE",
                ingredientId: "ao08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Courgette
            },
            {
                quantity: 2,
                unit: "PIECE",
                ingredientId: "b08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Tomate
            },
            {
                quantity: 1,
                unit: "PIECE",
                ingredientId: "z08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Poivron
            },
            {
                quantity: 1,
                unit: "PIECE",
                ingredientId: "j08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Oignon
            },
            {
                quantity: 2,
                unit: "PIECE",
                ingredientId: "ae08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Ail
            },
            {
                quantity: 30,
                unit: "MILLILITER",
                ingredientId: "ag08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Huile d'olive
            },
            {
                quantity: 5,
                unit: "GRAM",
                ingredientId: "ap08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Herbes de Provence
            },
        ],
    },
    {
        id: "recipe9-id",
        title: "Madeleines",
        description: "De petits gâteaux moelleux en forme de coquillage.",
        numberOfServing: 12,
        preparationTime: 25,
        difficultyLevel: "EASY",
        lunchType: "SNACK",
        lunchStep: "DESSERT",
        userId: "user1-id", // Alice Dupont
        Image: [
            { url: "/recipes/madeleines-1.webp", alt: "Madeleines 1" },
            { url: "/recipes/madeleines-2.webp", alt: "Madeleines 2" },
        ],
        Favorite: [
            { favorite: false, userId: "user1-id" }, // Alice
            { favorite: false, userId: "user2-id" }, // Bob
            { favorite: true, userId: "user3-id" }, // Chloé
            { favorite: true, userId: "admin2-id" }, // Jean Dubois
        ],
        Review: [
            {
                review: "Les madeleines sont délicieuses. Elles sont moelleuses à l'intérieur et légèrement croustillantes à l'extérieur. La recette est simple à suivre, et le résultat est digne d'une pâtisserie.",
                userId: "user2-id", // Bob Martin
                thumbsPositive: ["user3-id", "modo1-id"],
                thumbsNegative: [],
            },
            {
                review: "Les madeleines étaient parfaites! La recette était facile à suivre, et le résultat était délicieux. Elles ont été dévorées en quelques minutes.",
                userId: "user3-id", // Chloé Bernard
                thumbsPositive: ["user2-id"],
                thumbsNegative: [],
            },
        ],
        Rating: [
            { rating: 2, userId: "user1-id" }, // Alice
            { rating: 5, userId: "user2-id" }, // Bob
            { rating: 5, userId: "user3-id" }, // Chloé
        ],
        Quantity: [
            {
                quantity: 150,
                unit: "GRAM",
                ingredientId: "e08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Farine
            },
            {
                quantity: 150,
                unit: "GRAM",
                ingredientId: "h08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Sucre
            },
            {
                quantity: 125,
                unit: "GRAM",
                ingredientId: "f08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Beurre
            },
            {
                quantity: 4,
                unit: "PIECE",
                ingredientId: "d08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Œuf
            },
            {
                quantity: 5,
                unit: "GRAM",
                ingredientId: "aq08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Levure chimique
            },
            {
                quantity: 1,
                unit: "PIECE",
                ingredientId: "ar08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Zeste de citron
            },
            {
                quantity: 5,
                unit: "MILLILITER",
                ingredientId: "as08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Vanille
            },
        ],
    },
    {
        id: "recipe10-id",
        title: "Coq au Vin",
        description: "Un plat traditionnel de poulet mijoté au vin rouge.",
        numberOfServing: 6,
        preparationTime: 150,
        difficultyLevel: "HARD",
        lunchType: "DINNER",
        lunchStep: "MAIN",
        userId: "user2-id", // Bob Martin
        Image: [{ url: "/recipes/coq-au-vin-1.webp", alt: "Coq au Vin 1" }],
        Favorite: [
            { favorite: true, userId: "user2-id" }, // Bob
            { favorite: false, userId: "user1-id" }, // Alice
            { favorite: false, userId: "user3-id" }, // Chloé
            { favorite: true, userId: "admin1-id" }, // Isabelle Petit
        ],
        Review: [
            {
                review: "Absolument délicieux, je recommande fortement. Le coq au vin était tendre et savoureux, avec une sauce riche et parfumée. Toute la famille a adoré et m'a demandé de le refaire bientôt.",
                userId: "user1-id", // Alice Dupont
                thumbsPositive: ["user2-id", "modo1-id"],
                thumbsNegative: [],
            },
            {
                review: "Un plat traditionnel très bien exécuté. Le coq au vin avait une saveur riche, et la viande était tendre. C'était un peu long à préparer, mais le résultat en valait la peine.",
                userId: "user3-id", // Chloé Bernard
                thumbsPositive: ["user1-id", "admin2-id"],
                thumbsNegative: [],
            },
        ],
        Rating: [
            { rating: 4, userId: "user2-id" }, // Bob
            { rating: 5, userId: "user1-id" }, // Alice
            { rating: 4, userId: "user3-id" }, // Chloé
        ],
        Quantity: [
            {
                quantity: 1,
                unit: "PIECE",
                ingredientId: "at08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Poulet
            },
            {
                quantity: 750,
                unit: "MILLILITER",
                ingredientId: "k08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Vin rouge
            },
            {
                quantity: 200,
                unit: "GRAM",
                ingredientId: "q08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Lardons
            },
            {
                quantity: 250,
                unit: "GRAM",
                ingredientId: "ad08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Champignon
            },
            {
                quantity: 2,
                unit: "PIECE",
                ingredientId: "j08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Oignon
            },
            {
                quantity: 2,
                unit: "PIECE",
                ingredientId: "ac08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Carotte
            },
            {
                quantity: 2,
                unit: "PIECE",
                ingredientId: "ae08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Ail
            },
            {
                quantity: 1,
                unit: "PIECE",
                ingredientId: "af08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Bouquet garni
            },
            {
                quantity: 30,
                unit: "GRAM",
                ingredientId: "e08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Farine
            },
            {
                quantity: 30,
                unit: "MILLILITER",
                ingredientId: "ag08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Huile d'olive
            },
            {
                quantity: 5,
                unit: "GRAM",
                ingredientId: "m08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Sel
            },
            {
                quantity: 2,
                unit: "GRAM",
                ingredientId: "n08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Poivre
            },
        ],
    },
    {
        id: "recipe11-id",
        title: "Soufflé au Fromage",
        description: "Un soufflé léger et aérien au fromage.",
        numberOfServing: 4,
        preparationTime: 50,
        difficultyLevel: "MEDIUM",
        lunchType: "LUNCH",
        lunchStep: "STARTER",
        userId: "user3-id", // Chloé Bernard
        Image: [
            { url: "/recipes/souffle-au-fromage-1.webp", alt: "Soufflé au Fromage 1" },
            { url: "/recipes/souffle-au-fromage-2.webp", alt: "Soufflé au Fromage 2" },
        ],
        Favorite: [
            { favorite: true, userId: "user1-id" }, // Alice
            { favorite: true, userId: "user2-id" }, // Bob
            { favorite: true, userId: "user3-id" }, // Chloé
            { favorite: true, userId: "modo2-id" }, // Hélène Fournier
        ],
        Review: [
            {
                review: "Le soufflé est parfaitement aéré, un vrai régal. C'était la première fois que je faisais un soufflé, et les instructions étaient claires et faciles à suivre. Le résultat était impressionnant et a épaté mes invités.",
                userId: "user1-id", // Alice Dupont
                thumbsPositive: ["user2-id", "modo2-id"],
                thumbsNegative: [],
            },
            {
                review: "Le soufflé était parfait, je l'ajoute à mes favoris! La texture était légère et aérée, et le goût du fromage était bien présent sans être trop fort. C'est une recette que je referai sans hésiter.",
                userId: "user2-id", // Bob Martin
                thumbsPositive: ["user1-id"],
                thumbsNegative: [],
            },
            {
                review: "Bon mais pourrait être meilleur. Le soufflé était bon, mais il est retombé rapidement après la cuisson. Peut-être que j'ai manqué une étape. Je réessaierai pour m'améliorer.",
                userId: "user3-id", // Chloé Bernard
                thumbsPositive: ["modo1-id"],
                thumbsNegative: [],
            },
        ],
        Rating: [
            { rating: 5, userId: "user1-id" }, // Alice
            { rating: 5, userId: "user2-id" }, // Bob
            { rating: 3, userId: "user3-id" }, // Chloé
        ],
        Quantity: [
            {
                quantity: 50,
                unit: "GRAM",
                ingredientId: "f08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Beurre
            },
            {
                quantity: 50,
                unit: "GRAM",
                ingredientId: "e08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Farine
            },
            {
                quantity: 400,
                unit: "MILLILITER",
                ingredientId: "g08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Lait
            },
            {
                quantity: 150,
                unit: "GRAM",
                ingredientId: "s08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Fromage râpé
            },
            {
                quantity: 4,
                unit: "PIECE",
                ingredientId: "d08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Œuf
            },
            {
                quantity: 5,
                unit: "GRAM",
                ingredientId: "m08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Sel
            },
            {
                quantity: 2,
                unit: "GRAM",
                ingredientId: "n08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Poivre
            },
            {
                quantity: 1,
                unit: "GRAM",
                ingredientId: "au08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Muscade
            },
        ],
    },
];

export const fruitData: FruitFixtures[] = [
    {
        name: "Ananas",
        description: "Ananas description",
        image: "/fruits/ananas.webp",
    },
    {
        name: "Kiwi",
        description: "Kiwi description",
        image: "/fruits/kiwi.webp",
    },
    {
        name: "Mangue",
        description: "Mangue description",
        image: "/fruits/mangue.webp",
    },
];
