import { UserFixtures } from "@actions/types/User";
import { RecipeFixtures } from "@actions/types/Recipe";
import { IngredientFixtures } from "@actions/types/Ingredient";
import { AccountFixtures } from "@actions/types/Account";
import { FruitFixtures } from "@actions/types/Fruit";
import { RecipeIngredientFixtures } from "@actions/types/RecipeIngredient";
import { RecipeUserFixtures } from "@actions/types/RecipeUser";

export const userData: UserFixtures[] = [
    {
        id: "toBHB_pGnW7-W7aGHLEIv",
        name: "user user",
        email: "user@gmail.com",
        emailVerified: true,
        image: null,
        role: "USER",
    },
    {
        id: "2aCaYxGoux1pC3UxaCR-v",
        name: "modo modo",
        email: "modo@gmail.com",
        emailVerified: true,
        image: null,
        role: "MODO",
    },
    {
        id: "IVJshIzteyubCt_Q136BW",
        name: "admin admin",
        email: "admin@gmail.com",
        emailVerified: true,
        image: null,
        role: "ADMIN",
    },
];

export const accountData: AccountFixtures[] = [
    {
        id: "6BNuz9iYRv0Xbvr4AacW6",
        accountId: "toBHB_pGnW7-W7aGHLEIv",
        providerId: "credential",
        userId: "toBHB_pGnW7-W7aGHLEIv",
        password:
            "eb3841a40d9eca2bbc5314408aa2d9b5:3af534f79d7a7c59a7d2de8bcb246fe81c232ca80315c3eb563e37f34c8bb9fe9ca3ad456ccb0d303c815cf239cc7bebfe33352ee664e490bda95ceafd2fc9e7",
    },
    {
        id: "RsxJn5fHH54cGVmR500LB",
        accountId: "2aCaYxGoux1pC3UxaCR-v",
        providerId: "credential",
        userId: "2aCaYxGoux1pC3UxaCR-v",
        password:
            "1e466a9ea4625667b0afa37f37fb606f:6a004e13b58523fa9258b26607895bb15c28845cf4a216691572cd4cf4e5e518c516f525786cc4a0abce76ac68745c32258e998e8ad721ea6c6aefe8e263f4ef",
    },
    {
        id: "u1YGDTS_Peq9LNGO754H5",
        accountId: "IVJshIzteyubCt_Q136BW",
        providerId: "credential",
        userId: "IVJshIzteyubCt_Q136BW",
        password:
            "572a76ee988aa5655d9365074f38bb4d:8d68bcf63ab0ab080794b4d2a4d66316c120913c81193d1a87be02f832aa0dc3cae646c87726953b78138ebac4a01014c13b2be6b85416e1341877d8f3c07844",
    },
];

export const ingredientData: IngredientFixtures[] = [
    {
        id: "a08f99f8-9b9e-11ef-ad19-d8dbc1515316",
        name: "Cornichon",
        description: "Un petit concombre mariné dans du vinaigre.",
        image: null,
    },
    {
        id: "b08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Tomate",
        description: "Un fruit rouge utilisé comme légume en cuisine.",
        image: null,
    },
    {
        id: "c08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Laitue",
        description: "Une salade verte croquante.",
        image: null,
    },
    {
        id: "d08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Œuf",
        description: "Œuf de poule utilisé dans de nombreuses recettes.",
        image: null,
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
        image: null,
    },
    {
        id: "j08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Oignon",
        description: "Légume bulbeux utilisé pour aromatiser les plats.",
        image: null,
    },
    {
        id: "k08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Vin rouge",
        description: "Vin utilisé pour cuisiner.",
        image: null,
    },
    {
        id: "l08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Vin blanc",
        description: "Vin blanc sec pour la cuisine.",
        image: null,
    },
    {
        id: "m08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Sel",
        description: "Assaisonnement de base.",
        image: null,
    },
    {
        id: "n08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Poivre",
        description: "Épice utilisée pour relever le goût.",
        image: null,
    },
    {
        id: "o08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Bœuf",
        description: "Viande de bœuf pour les plats mijotés.",
        image: null,
    },
    {
        id: "p08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Pâte brisée",
        description: "Pâte utilisée pour les tartes salées.",
        image: null,
    },
    {
        id: "q08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Lardons",
        description: "Petits morceaux de lard fumé.",
        image: null,
    },
    {
        id: "r08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Crème fraîche",
        description: "Crème laitière épaisse.",
        image: null,
    },
    {
        id: "s08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Fromage râpé",
        description: "Fromage râpé pour gratiner.",
        image: null,
    },
    {
        id: "t08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Bouillon de bœuf",
        description: "Bouillon préparé à partir de viande de bœuf.",
        image: null,
    },
    {
        id: "u08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Pain",
        description: "Pain de campagne ou baguette.",
        image: null,
    },
    {
        id: "v08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Thon",
        description: "Poisson utilisé en boîte ou frais.",
        image: null,
    },
    {
        id: "w08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Haricots verts",
        description: "Légumes verts longs et fins.",
        image: null,
    },
    {
        id: "x08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Olives noires",
        description: "Olives mûres pour agrémenter les plats.",
        image: null,
    },
    {
        id: "y08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Anchois",
        description: "Petits poissons salés.",
        image: null,
    },
    {
        id: "z08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Poivron",
        description: "Légume coloré, rouge, vert ou jaune.",
        image: null,
    },
    {
        id: "aa08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Oignon rouge",
        description: "Oignon doux de couleur rouge.",
        image: null,
    },
    {
        id: "ab08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Vinaigrette",
        description: "Sauce à base d'huile et de vinaigre.",
        image: null,
    },
    {
        id: "ac08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Carotte",
        description: "Légume racine orange.",
        image: null,
    },
    {
        id: "ad08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Champignon",
        description: "Champignons de Paris ou autres variétés.",
        image: null,
    },
    {
        id: "ae08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Ail",
        description: "Bulbe utilisé pour aromatiser.",
        image: null,
    },
    {
        id: "af08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Bouquet garni",
        description: "Mélange d'herbes aromatiques.",
        image: null,
    },
    {
        id: "ag08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Huile d'olive",
        description: "Huile utilisée pour la cuisson et l'assaisonnement.",
        image: null,
    },
    {
        id: "ah08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Pomme",
        description: "Fruit utilisé dans les desserts.",
        image: null,
    },
    {
        id: "ai08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Pâte feuilletée",
        description: "Pâte légère pour les tartes et pâtisseries.",
        image: null,
    },
    {
        id: "aj08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Cannelle",
        description: "Épice utilisée dans les desserts.",
        image: null,
    },
    {
        id: "ak08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Pain de mie",
        description: "Pain moelleux utilisé pour les sandwichs.",
        image: null,
    },
    {
        id: "al08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Jambon",
        description: "Viande de porc cuite.",
        image: null,
    },
    {
        id: "am08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Sauce Béchamel",
        description: "Sauce blanche à base de lait.",
        image: null,
    },
    {
        id: "an08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Aubergine",
        description: "Légume violet utilisé dans la ratatouille.",
        image: null,
    },
    {
        id: "ao08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Courgette",
        description: "Légume vert allongé.",
        image: null,
    },
    {
        id: "ap08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Herbes de Provence",
        description: "Mélange d'herbes aromatiques sèches.",
        image: null,
    },
    {
        id: "aq08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Levure chimique",
        description: "Agent levant pour la pâtisserie.",
        image: null,
    },
    {
        id: "ar08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Zeste de citron",
        description: "Écorce de citron râpée.",
        image: null,
    },
    {
        id: "as08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Vanille",
        description: "Arôme naturel pour les desserts.",
        image: null,
    },
    {
        id: "at08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Poulet",
        description: "Viande de volaille.",
        image: null,
    },
    {
        id: "au08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Muscade",
        description: "Épice utilisée pour aromatiser.",
        image: null,
    },
    {
        id: "av08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Zeste d'orange",
        description: "Écorce d'orange râpée.",
        image: null,
    },
    {
        id: "aw08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Jus d'orange",
        description: "Jus extrait des oranges.",
        image: null,
    },
    {
        id: "ax08w79f6-9b9e-11ef-ad19-d8bbc1515316",
        name: "Grand Marnier",
        description: "Liqueur à l'orange.",
        image: null,
    },
];

export const recipeData: RecipeFixtures[] = [
    {
        id: "d08d79f6-9b9e-11ef-ad19-d8bbc1515316",
        title: "Quiche Lorraine",
        description: "Une délicieuse quiche à base de lardons et de crème fraîche.",
        image: "/recipes/quiche-lorraine.webp",
        numberOfServing: 6,
        preparationTime: 60,
        difficultyLevel: "MEDIUM",
        lunchType: "LUNCH",
        lunchStep: "MAIN",
        userId: "toBHB_pGnW7-W7aGHLEIv",
    },
    {
        id: "e08e79f6-9b9e-11ef-ad19-d8bbc1515316",
        title: "Soupe à l'oignon",
        description: "Une soupe traditionnelle française aux oignons caramélisés.",
        image: "/recipes/soupe-a-l'oignon.webp",
        numberOfServing: 4,
        preparationTime: 45,
        difficultyLevel: "EASY",
        lunchType: "DINNER",
        lunchStep: "STARTER",
        userId: "2aCaYxGoux1pC3UxaCR-v",
    },
    {
        id: "f08f79f6-9b9e-11ef-ad19-d8bbc1515316",
        title: "Crêpes Suzette",
        description: "Des crêpes fines servies avec une sauce au beurre et à l'orange.",
        image: "/recipes/crepes-suzette.webp",
        numberOfServing: 4,
        preparationTime: 30,
        difficultyLevel: "MEDIUM",
        lunchType: "BREAKFAST",
        lunchStep: "DESSERT",
        userId: "IVJshIzteyubCt_Q136BW",
    },
    {
        id: "g09079f6-9b9e-11ef-ad19-d8bbc1515316",
        title: "Salade Niçoise",
        description: "Une salade fraîche avec du thon, des œufs et des légumes croquants.",
        image: "/recipes/salade-nicoise.webp",
        numberOfServing: 2,
        preparationTime: 20,
        difficultyLevel: "EASY",
        lunchType: "LUNCH",
        lunchStep: "MAIN",
        userId: "toBHB_pGnW7-W7aGHLEIv",
    },
    {
        id: "h09179f6-9b9e-11ef-ad19-d8bbc1515316",
        title: "Bœuf Bourguignon",
        description: "Un ragoût de bœuf mijoté au vin rouge et aux champignons.",
        image: "/recipes/boeuf-bourguignon.webp",
        numberOfServing: 6,
        preparationTime: 180,
        difficultyLevel: "HARD",
        lunchType: "DINNER",
        lunchStep: "MAIN",
        userId: "2aCaYxGoux1pC3UxaCR-v",
    },
    {
        id: "i09279f6-9b9e-11ef-ad19-d8bbc1515316",
        title: "Tarte Tatin",
        description: "Une tarte aux pommes caramélisées à l'envers.",
        image: "/recipes/tarte-tatin.webp",
        numberOfServing: 8,
        preparationTime: 90,
        difficultyLevel: "MEDIUM",
        lunchType: "DINNER",
        lunchStep: "DESSERT",
        userId: "IVJshIzteyubCt_Q136BW",
    },
    {
        id: "j09379f6-9b9e-11ef-ad19-d8bbc1515316",
        title: "Croque-Monsieur",
        description: "Un sandwich chaud au jambon et au fromage gratiné.",
        image: "/recipes/croque-monsieur.webp",
        numberOfServing: 1,
        preparationTime: 15,
        difficultyLevel: "EASY",
        lunchType: "SNACK",
        lunchStep: "MAIN",
        userId: "toBHB_pGnW7-W7aGHLEIv",
    },
    {
        id: "k09479f6-9b9e-11ef-ad19-d8bbc1515316",
        title: "Ratatouille",
        description: "Un mélange de légumes mijotés, typique du sud de la France.",
        image: "/recipes/ratatouille.webp",
        numberOfServing: 4,
        preparationTime: 60,
        difficultyLevel: "MEDIUM",
        lunchType: "DINNER",
        lunchStep: "MAIN",
        userId: "2aCaYxGoux1pC3UxaCR-v",
    },
    {
        id: "l09579f6-9b9e-11ef-ad19-d8bbc1515316",
        title: "Madeleines",
        description: "De petits gâteaux moelleux en forme de coquillage.",
        image: "/recipes/madeleines.webp",
        numberOfServing: 12,
        preparationTime: 25,
        difficultyLevel: "EASY",
        lunchType: "SNACK",
        lunchStep: "DESSERT",
        userId: "IVJshIzteyubCt_Q136BW",
    },
    {
        id: "m09679f6-9b9e-11ef-ad19-d8bbc1515316",
        title: "Coq au Vin",
        description: "Un plat traditionnel de poulet mijoté au vin rouge.",
        image: "/recipes/coq-au-vin.webp",
        numberOfServing: 6,
        preparationTime: 150,
        difficultyLevel: "HARD",
        lunchType: "DINNER",
        lunchStep: "MAIN",
        userId: "toBHB_pGnW7-W7aGHLEIv",
    },
    {
        id: "n09779f6-9b9e-11ef-ad19-d8bbc1515316",
        title: "Soufflé au Fromage",
        description: "Un soufflé léger et aérien au fromage.",
        image: "/recipes/souffle-au-fromage.webp",
        numberOfServing: 4,
        preparationTime: 50,
        difficultyLevel: "MEDIUM",
        lunchType: "LUNCH",
        lunchStep: "STARTER",
        userId: "2aCaYxGoux1pC3UxaCR-v",
    },
];

export const recipeIngredientData: RecipeIngredientFixtures[] = [
    // **Quiche Lorraine**
    {
        quantity: 1,
        unit: "PIECE",
        recipeId: "d08d79f6-9b9e-11ef-ad19-d8bbc1515316", // Quiche Lorraine
        ingredientId: "p08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Pâte brisée
    },
    {
        quantity: 200,
        unit: "GRAM",
        recipeId: "d08d79f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "q08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Lardons
    },
    {
        quantity: 3,
        unit: "PIECE",
        recipeId: "d08d79f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "d08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Œuf
    },
    {
        quantity: 200,
        unit: "MILLILITER",
        recipeId: "d08d79f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "r08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Crème fraîche
    },
    {
        quantity: 100,
        unit: "GRAM",
        recipeId: "d08d79f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "s08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Fromage râpé
    },
    // **Soupe à l'oignon**
    {
        quantity: 500,
        unit: "GRAM",
        recipeId: "e08e79f6-9b9e-11ef-ad19-d8bbc1515316", // Soupe à l'oignon
        ingredientId: "j08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Oignon
    },
    {
        quantity: 50,
        unit: "GRAM",
        recipeId: "e08e79f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "f08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Beurre
    },
    {
        quantity: 20,
        unit: "GRAM",
        recipeId: "e08e79f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "e08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Farine
    },
    {
        quantity: 1,
        unit: "LITER",
        recipeId: "e08e79f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "t08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Bouillon de bœuf
    },
    {
        quantity: 4,
        unit: "PIECE",
        recipeId: "e08e79f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "u08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Pain
    },
    {
        quantity: 100,
        unit: "GRAM",
        recipeId: "e08e79f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "s08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Fromage râpé
    },
    // **Crêpes Suzette**
    {
        quantity: 200,
        unit: "GRAM",
        recipeId: "f08f79f6-9b9e-11ef-ad19-d8bbc1515316", // Crêpes Suzette
        ingredientId: "e08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Farine
    },
    {
        quantity: 500,
        unit: "MILLILITER",
        recipeId: "f08f79f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "g08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Lait
    },
    {
        quantity: 3,
        unit: "PIECE",
        recipeId: "f08f79f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "d08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Œuf
    },
    {
        quantity: 50,
        unit: "GRAM",
        recipeId: "f08f79f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "f08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Beurre
    },
    {
        quantity: 50,
        unit: "GRAM",
        recipeId: "f08f79f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "h08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Sucre
    },
    {
        quantity: 1,
        unit: "PIECE",
        recipeId: "f08f79f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "av08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Zeste d'orange
    },
    {
        quantity: 100,
        unit: "MILLILITER",
        recipeId: "f08f79f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "aw08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Jus d'orange
    },
    {
        quantity: 50,
        unit: "MILLILITER",
        recipeId: "f08f79f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "ax08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Grand Marnier
    },
    // **Salade Niçoise**
    {
        quantity: 100,
        unit: "GRAM",
        recipeId: "g09079f6-9b9e-11ef-ad19-d8bbc1515316", // Salade Niçoise
        ingredientId: "v08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Thon
    },
    {
        quantity: 2,
        unit: "PIECE",
        recipeId: "g09079f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "d08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Œuf
    },
    {
        quantity: 100,
        unit: "GRAM",
        recipeId: "g09079f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "w08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Haricots verts
    },
    {
        quantity: 2,
        unit: "PIECE",
        recipeId: "g09079f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "b08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Tomate
    },
    {
        quantity: 50,
        unit: "GRAM",
        recipeId: "g09079f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "x08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Olives noires
    },
    {
        quantity: 50,
        unit: "GRAM",
        recipeId: "g09079f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "y08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Anchois
    },
    {
        quantity: 1,
        unit: "PIECE",
        recipeId: "g09079f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "c08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Laitue
    },
    {
        quantity: 50,
        unit: "MILLILITER",
        recipeId: "g09079f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "ab08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Vinaigrette
    },
    // **Bœuf Bourguignon**
    {
        quantity: 1,
        unit: "KILOGRAM",
        recipeId: "h09179f6-9b9e-11ef-ad19-d8bbc1515316", // Bœuf Bourguignon
        ingredientId: "o08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Bœuf
    },
    {
        quantity: 150,
        unit: "GRAM",
        recipeId: "h09179f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "q08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Lardons
    },
    {
        quantity: 2,
        unit: "PIECE",
        recipeId: "h09179f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "j08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Oignon
    },
    {
        quantity: 2,
        unit: "PIECE",
        recipeId: "h09179f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "ac08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Carotte
    },
    {
        quantity: 250,
        unit: "GRAM",
        recipeId: "h09179f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "ad08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Champignon
    },
    {
        quantity: 500,
        unit: "MILLILITER",
        recipeId: "h09179f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "k08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Vin rouge
    },
    {
        quantity: 2,
        unit: "PIECE", // Utilisez "PIECE" pour les gousses d'ail
        recipeId: "h09179f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "ae08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Ail
    },
    {
        quantity: 1,
        unit: "PIECE",
        recipeId: "h09179f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "af08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Bouquet garni
    },
    {
        quantity: 30,
        unit: "MILLILITER", // Environ 2 cuillères à soupe
        recipeId: "h09179f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "ag08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Huile d'olive
    },
    // **Tarte Tatin**
    {
        quantity: 1,
        unit: "PIECE",
        recipeId: "i09279f6-9b9e-11ef-ad19-d8bbc1515316", // Tarte Tatin
        ingredientId: "ai08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Pâte feuilletée
    },
    {
        quantity: 6,
        unit: "PIECE",
        recipeId: "i09279f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "ah08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Pomme
    },
    {
        quantity: 100,
        unit: "GRAM",
        recipeId: "i09279f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "h08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Sucre
    },
    {
        quantity: 50,
        unit: "GRAM",
        recipeId: "i09279f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "f08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Beurre
    },
    {
        quantity: 5,
        unit: "GRAM", // Environ une cuillère à café
        recipeId: "i09279f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "aj08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Cannelle
    },
    // **Croque-Monsieur**
    {
        quantity: 2,
        unit: "PIECE",
        recipeId: "j09379f6-9b9e-11ef-ad19-d8bbc1515316", // Croque-Monsieur
        ingredientId: "ak08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Pain de mie
    },
    {
        quantity: 2,
        unit: "PIECE", // Utilisez "PIECE" pour les tranches de jambon
        recipeId: "j09379f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "al08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Jambon
    },
    {
        quantity: 50,
        unit: "GRAM",
        recipeId: "j09379f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "i08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Fromage
    },
    {
        quantity: 30,
        unit: "GRAM",
        recipeId: "j09379f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "am08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Sauce Béchamel
    },
    // **Ratatouille**
    {
        quantity: 2,
        unit: "PIECE",
        recipeId: "k09479f6-9b9e-11ef-ad19-d8bbc1515316", // Ratatouille
        ingredientId: "an08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Aubergine
    },
    {
        quantity: 2,
        unit: "PIECE",
        recipeId: "k09479f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "ao08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Courgette
    },
    {
        quantity: 2,
        unit: "PIECE",
        recipeId: "k09479f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "b08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Tomate
    },
    {
        quantity: 1,
        unit: "PIECE",
        recipeId: "k09479f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "z08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Poivron
    },
    {
        quantity: 1,
        unit: "PIECE",
        recipeId: "k09479f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "j08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Oignon
    },
    {
        quantity: 2,
        unit: "PIECE",
        recipeId: "k09479f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "ae08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Ail
    },
    {
        quantity: 30,
        unit: "MILLILITER",
        recipeId: "k09479f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "ag08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Huile d'olive
    },
    {
        quantity: 5,
        unit: "GRAM",
        recipeId: "k09479f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "ap08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Herbes de Provence
    },
    // **Madeleines**
    {
        quantity: 150,
        unit: "GRAM",
        recipeId: "l09579f6-9b9e-11ef-ad19-d8bbc1515316", // Madeleines
        ingredientId: "e08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Farine
    },
    {
        quantity: 150,
        unit: "GRAM",
        recipeId: "l09579f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "h08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Sucre
    },
    {
        quantity: 125,
        unit: "GRAM",
        recipeId: "l09579f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "f08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Beurre
    },
    {
        quantity: 4,
        unit: "PIECE",
        recipeId: "l09579f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "d08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Œuf
    },
    {
        quantity: 5,
        unit: "GRAM",
        recipeId: "l09579f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "aq08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Levure chimique
    },
    {
        quantity: 1,
        unit: "PIECE", // Zeste d'un citron
        recipeId: "l09579f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "ar08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Zeste de citron
    },
    {
        quantity: 5,
        unit: "MILLILITER",
        recipeId: "l09579f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "as08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Vanille
    },
    // **Coq au Vin**
    {
        quantity: 1,
        unit: "PIECE", // Un coq ou poulet entier
        recipeId: "m09679f6-9b9e-11ef-ad19-d8bbc1515316", // Coq au Vin
        ingredientId: "at08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Poulet
    },
    {
        quantity: 750,
        unit: "MILLILITER",
        recipeId: "m09679f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "k08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Vin rouge
    },
    {
        quantity: 200,
        unit: "GRAM",
        recipeId: "m09679f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "q08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Lardons
    },
    {
        quantity: 250,
        unit: "GRAM",
        recipeId: "m09679f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "ad08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Champignon
    },
    {
        quantity: 2,
        unit: "PIECE",
        recipeId: "m09679f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "j08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Oignon
    },
    {
        quantity: 2,
        unit: "PIECE",
        recipeId: "m09679f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "ac08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Carotte
    },
    {
        quantity: 2,
        unit: "PIECE", // Gousses d'ail
        recipeId: "m09679f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "ae08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Ail
    },
    {
        quantity: 1,
        unit: "PIECE",
        recipeId: "m09679f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "af08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Bouquet garni
    },
    {
        quantity: 30,
        unit: "GRAM",
        recipeId: "m09679f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "e08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Farine
    },
    {
        quantity: 30,
        unit: "MILLILITER",
        recipeId: "m09679f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "ag08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Huile d'olive
    },
    {
        quantity: 5,
        unit: "GRAM",
        recipeId: "m09679f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "m08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Sel
    },
    {
        quantity: 2,
        unit: "GRAM",
        recipeId: "m09679f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "n08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Poivre
    },

    // **Soufflé au Fromage**
    {
        quantity: 50,
        unit: "GRAM",
        recipeId: "n09779f6-9b9e-11ef-ad19-d8bbc1515316", // Soufflé au Fromage
        ingredientId: "f08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Beurre
    },
    {
        quantity: 50,
        unit: "GRAM",
        recipeId: "n09779f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "e08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Farine
    },
    {
        quantity: 400,
        unit: "MILLILITER",
        recipeId: "n09779f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "g08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Lait
    },
    {
        quantity: 150,
        unit: "GRAM",
        recipeId: "n09779f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "s08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Fromage râpé
    },
    {
        quantity: 4,
        unit: "PIECE",
        recipeId: "n09779f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "d08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Œuf
    },
    {
        quantity: 5,
        unit: "GRAM",
        recipeId: "n09779f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "m08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Sel
    },
    {
        quantity: 2,
        unit: "GRAM",
        recipeId: "n09779f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "n08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Poivre
    },
    {
        quantity: 1,
        unit: "GRAM",
        recipeId: "n09779f6-9b9e-11ef-ad19-d8bbc1515316",
        ingredientId: "au08w79f6-9b9e-11ef-ad19-d8bbc1515316", // Muscade
    },
];

export const userFavoriteData: RecipeUserFixtures[] = [
    {
        favorite: true,
        rating: 5,
        userId: "IVJshIzteyubCt_Q136BW",
        recipeId: "d08d79f6-9b9e-11ef-ad19-d8bbc1515316",
    },
    {
        favorite: true,
        rating: 5,
        userId: "IVJshIzteyubCt_Q136BW",
        recipeId: "f08f79f6-9b9e-11ef-ad19-d8bbc1515316",
    },
    {
        favorite: true,
        rating: 5,
        userId: "IVJshIzteyubCt_Q136BW",
        recipeId: "i09279f6-9b9e-11ef-ad19-d8bbc1515316",
    },
    {
        favorite: true,
        rating: 5,
        userId: "IVJshIzteyubCt_Q136BW",
        recipeId: "l09579f6-9b9e-11ef-ad19-d8bbc1515316",
    },
    {
        favorite: true,
        rating: 5,
        userId: "toBHB_pGnW7-W7aGHLEIv",
        recipeId: "e08e79f6-9b9e-11ef-ad19-d8bbc1515316",
    },
    {
        favorite: true,
        rating: 5,
        userId: "toBHB_pGnW7-W7aGHLEIv",
        recipeId: "g09079f6-9b9e-11ef-ad19-d8bbc1515316",
    },
    {
        favorite: true,
        rating: 5,
        userId: "toBHB_pGnW7-W7aGHLEIv",
        recipeId: "j09379f6-9b9e-11ef-ad19-d8bbc1515316",
    },
    {
        favorite: true,
        rating: 5,
        userId: "toBHB_pGnW7-W7aGHLEIv",
        recipeId: "m09679f6-9b9e-11ef-ad19-d8bbc1515316",
    },
    {
        favorite: true,
        rating: 5,
        userId: "2aCaYxGoux1pC3UxaCR-v",
        recipeId: "h09179f6-9b9e-11ef-ad19-d8bbc1515316",
    },
    {
        favorite: true,
        rating: 5,
        userId: "2aCaYxGoux1pC3UxaCR-v",
        recipeId: "k09479f6-9b9e-11ef-ad19-d8bbc1515316",
    },
    {
        favorite: true,
        rating: 5,
        userId: "2aCaYxGoux1pC3UxaCR-v",
        recipeId: "n09779f6-9b9e-11ef-ad19-d8bbc1515316",
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
