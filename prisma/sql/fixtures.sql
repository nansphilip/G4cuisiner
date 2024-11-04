USE `g4cuisiner-db`;

INSERT INTO
    `fruit` ( `id`, `name`, `description`, `image`, `createdAt`, `updatedAt`)
VALUES
    ( UUID(), "Kiwi", "Fruit exotique", "/images/kiwi.webp", NOW(), NOW()),
    ( UUID(), "Mangue", "Fruit exotique", "/images/mangue.webp", NOW(), NOW()),
    ( UUID(), "Ananas", "Fruit exotique", "/images/ananas.webp", NOW(), NOW());

INSERT INTO
    `user` ( `id`, `name`, `email`, `emailVerified`, `image`, `role`, `createdAt`, `updatedAt`)
VALUES
    ( "2f2cb76b-9438-11ef-ad19-d8bbc1515316", "John Doe", "john.doe@gmail.com", 0, NULL, "USER", NOW(), NOW()),
    ( "2f2cbb25-9438-11ef-ad19-d8bbc1515316", "Jane Doe", "jane.doe@gmail.com", 0, NULL, "MODO", NOW(), NOW()),
    ( "2f2cbcb9-9438-11ef-ad19-d8bbc1515316", "Henry Smith", "henry.smith@gmail.com", 0, NULL, "ADMIN", NOW(), NOW());

INSERT INTO
    `ingredient` ( `id`, `name`, `description`, `image`, `createdAt`, `updatedAt`)
VALUES
    ( "e0e44ef2-9438-11ef-ad19-d8bbc1515316", "Beurre", "Beurre demi-sel", "/images/beurre.webp", NOW(), NOW()),
    ( "e0e452ea-9438-11ef-ad19-d8bbc1515316", "Farine", "Farine de blé", "/images/farine.webp", NOW(), NOW()),
    ( "e0e4544a-9438-11ef-ad19-d8bbc1515316", "Sucre", "Sucre en poudre", "/images/sucre.webp", NOW(), NOW()),
    ( "e0e4557c-9438-11ef-ad19-d8bbc1515316", "Oeuf", "Oeuf de poule", "/images/oeuf.webp", NOW(), NOW()),
    ( "e0e4569c-9438-11ef-ad19-d8bbc1515316", "Lait", "Lait entier", "/images/lait.webp", NOW(), NOW()),
    ( "e0e457b7-9438-11ef-ad19-d8bbc1515316", "Jambon", "Jambon blanc", "/images/jambon.webp", NOW(), NOW());

INSERT INTO
    `lunchType` (`name`)
VALUES
    ("Petit-déjeuner"),
    ("Déjeuner"),
    ("Brunch"),
    ("Dîner"),
    ("Goûter"),
    ("Snack"),
    ("Boisson");

INSERT INTO
    `lunchStep` (`name`)
VALUES
    ("Entrée"),
    ("Plat"),
    ("Dessert"),
    ("Apéritif");

INSERT INTO
    `recipe` ( `id`, `title`, `slug`, `description`, `image`, `userId`, `preparationTime`, `createdAt`, `updatedAt`)
VALUES
    ( UUID(), "Salade de crevettes à la mangue", "salade-de-crevettes-a-la-mangue", "Des crevettes, de la salade, de la mangue", NULL, "2f2cbb25-9438-11ef-ad19-d8bbc1515316", 20, NOW(), NOW()),
    ( UUID(), "Croque Mcdo aux courgettes", "croque-mcdo-aux-courgettes", "Un bon burger pas bon aux légumes, mais ça ressemble plus à deux pancakes l'un sur l'autre", NULL, "2f2cb76b-9438-11ef-ad19-d8bbc1515316", 30, NOW(), NOW()),
    ( UUID(), "Quiche Lorraine", "quiche-lorraine", "Recette de quiche lorraine", "/images/quiche-lorraine.webp", "2f2cb76b-9438-11ef-ad19-d8bbc1515316", 40, NOW(), NOW()),
    ( UUID(), "Rôti de lotte au lard et au pesto d'épinards", "roti-de-lotte-au-lard-et-au-pesto-d-epinards", "Du poisson et des légumes", NULL, "2f2cb76b-9438-11ef-ad19-d8bbc1515316", 40, NOW(), NOW()),
    ( UUID(), "Poulet rôti", "poulet-roti", "Poulet roti à la broche (ou pas)", NULL, "2f2cbb25-9438-11ef-ad19-d8bbc1515316", 60, NOW(), NOW()),
    ( UUID(), "Dahl de lentilles", "dahl-de-lentilles", "Une recette épicée avec du lait de coco", NULL, "2f2cbcb9-9438-11ef-ad19-d8bbc1515316", 30, NOW(), NOW()),
    ( UUID(), "Rôti de boeuf en croûte", "roti-de-boeuf-en-croute", "Du roti de boeuf qui s'est blessé, donc il a une croute", NULL, "2f2cbb25-9438-11ef-ad19-d8bbc1515316", 60, NOW(), NOW()),
    ( UUID(), "Rôti de veau au fenouil et citron", "roti-de-veau-au-fenouil-et-citron", "Du veau, du citron, de l'acide", NULL, "2f2cb76b-9438-11ef-ad19-d8bbc1515316", 60, NOW(), NOW()),
    ( UUID(), "Noix de pétoncles blanc sauce safranée", "noix-de-petoncles-blanc-sauce-safranee", "Des noix étranges et de la sauce au safran", NULL, "2f2cbb25-9438-11ef-ad19-d8bbc1515316", 25, NOW(), NOW()),
    ( UUID(), "Rigatoni al ragù", "rigatoni-al-ragu", "Plat de pates", NULL, "2f2cbb25-9438-11ef-ad19-d8bbc1515316", 30, NOW(), NOW()),
    ( UUID(), "Rôti de boeuf Orloff", "roti-de-boeuf-orloff", "Du rôti avec du fromage et du jambon", NULL, "2f2cbb25-9438-11ef-ad19-d8bbc1515316", 35, NOW(), NOW()),
    ( UUID(), "Tarte aux pommes", "tarte-aux-pommes", "Recette de tarte aux pommes", "/images/tarte-aux-pommes.webp", "2f2cbcb9-9438-11ef-ad19-d8bbc1515316", 60, NOW(), NOW()),
    ( UUID(), "Crêpes", "crepes", "Recette de crêpes sucrées", "/images/crepes.webp", "2f2cb76b-9438-11ef-ad19-d8bbc1515316", 30, NOW(), NOW());
