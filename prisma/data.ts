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
        password:
            "eb3841a40d9eca2bbc5314408aa2d9b5:3af534f79d7a7c59a7d2de8bcb246fe81c232ca80315c3eb563e37f34c8bb9fe9ca3ad456ccb0d303c815cf239cc7bebfe33352ee664e490bda95ceafd2fc9e7",
    },
    {
        id: "account-user2-id",
        accountId: "user2-id",
        providerId: "credential",
        userId: "user2-id",
        password:
            "eb3841a40d9eca2bbc5314408aa2d9b5:3af534f79d7a7c59a7d2de8bcb246fe81c232ca80315c3eb563e37f34c8bb9fe9ca3ad456ccb0d303c815cf239cc7bebfe33352ee664e490bda95ceafd2fc9e7",
    },
    {
        id: "account-user3-id",
        accountId: "user3-id",
        providerId: "credential",
        userId: "user3-id",
        password:
            "eb3841a40d9eca2bbc5314408aa2d9b5:3af534f79d7a7c59a7d2de8bcb246fe81c232ca80315c3eb563e37f34c8bb9fe9ca3ad456ccb0d303c815cf239cc7bebfe33352ee664e490bda95ceafd2fc9e7",
    },
    {
        id: "account-user4-id",
        accountId: "user4-id",
        providerId: "credential",
        userId: "user4-id",
        password:
            "eb3841a40d9eca2bbc5314408aa2d9b5:3af534f79d7a7c59a7d2de8bcb246fe81c232ca80315c3eb563e37f34c8bb9fe9ca3ad456ccb0d303c815cf239cc7bebfe33352ee664e490bda95ceafd2fc9e7",
    },
    {
        id: "account-user5-id",
        accountId: "user5-id",
        providerId: "credential",
        userId: "user5-id",
        password:
            "eb3841a40d9eca2bbc5314408aa2d9b5:3af534f79d7a7c59a7d2de8bcb246fe81c232ca80315c3eb563e37f34c8bb9fe9ca3ad456ccb0d303c815cf239cc7bebfe33352ee664e490bda95ceafd2fc9e7",
    },
    {
        id: "account-user6-id",
        accountId: "user6-id",
        providerId: "credential",
        userId: "user6-id",
        password:
            "eb3841a40d9eca2bbc5314408aa2d9b5:3af534f79d7a7c59a7d2de8bcb246fe81c232ca80315c3eb563e37f34c8bb9fe9ca3ad456ccb0d303c815cf239cc7bebfe33352ee664e490bda95ceafd2fc9e7",
    },
    {
        id: "account-modo1-id",
        accountId: "modo1-id",
        providerId: "credential",
        userId: "modo1-id",
        password:
            "1e466a9ea4625667b0afa37f37fb606f:6a004e13b58523fa9258b26607895bb15c28845cf4a216691572cd4cf4e5e518c516f525786cc4a0abce76ac68745c32258e998e8ad721ea6c6aefe8e263f4ef",
    },
    {
        id: "account-modo2-id",
        accountId: "modo2-id",
        providerId: "credential",
        userId: "modo2-id",
        password:
            "1e466a9ea4625667b0afa37f37fb606f:6a004e13b58523fa9258b26607895bb15c28845cf4a216691572cd4cf4e5e518c516f525786cc4a0abce76ac68745c32258e998e8ad721ea6c6aefe8e263f4ef",
    },
    {
        id: "account-admin1-id",
        accountId: "admin1-id",
        providerId: "credential",
        userId: "admin1-id",
        password:
            "572a76ee988aa5655d9365074f38bb4d:8d68bcf63ab0ab080794b4d2a4d66316c120913c81193d1a87be02f832aa0dc3cae646c87726953b78138ebac4a01014c13b2be6b85416e1341877d8f3c07844",
    },
    {
        id: "account-admin2-id",
        accountId: "admin2-id",
        providerId: "credential",
        userId: "admin2-id",
        password:
            "572a76ee988aa5655d9365074f38bb4d:8d68bcf63ab0ab080794b4d2a4d66316c120913c81193d1a87be02f832aa0dc3cae646c87726953b78138ebac4a01014c13b2be6b85416e1341877d8f3c07844",
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
        Steps: "C'est la premiere etape@@@@@Ceci est la deuxieme etape",
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
        Steps: "C'est la premiere etape@@@@@Ceci est la deuxieme etape",
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
