USE `g4cuisiner-db`;

INSERT INTO
    `fruit` ( `id`, `name`, `description`, `image`, `createdAt`, `updatedAt`)
VALUES
    ( UUID(), "Kiwi", "Fruit exotique", "/images/kiwi.webp", NOW(), NOW()),
    ( UUID(), "Mangue", "Fruit exotique", "/images/mangue.webp", NOW(), NOW()),
    ( UUID(), "Ananas", "Fruit exotique", "/images/ananas.webp", NOW(), NOW());

INSERT INTO
    `user` ( `id`, `name`, `email`, `emailVerified`, `image`, `createdAt`, `updatedAt`)
VALUES
    ( "2f2cb76b-9438-11ef-ad19-d8bbc1515316", "John Doe", "john.doe@gmail.com", 0, NULL, NOW(), NOW()),
    ( "2f2cbb25-9438-11ef-ad19-d8bbc1515316", "Jane Doe", "jane.doe@gmail.com", 0, NULL, NOW(), NOW()),
    ( "2f2cbcb9-9438-11ef-ad19-d8bbc1515316", "Henry Smith", "henry.smith@gmail.com", 0, NULL, NOW(), NOW());

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
    `recipe` ( `id`, `title`, `slug`, `description`, `image`, `userId`, `createdAt`, `updatedAt`)
VALUES
    ( UUID(), "Crêpes", "crepes", "Recette de crêpes sucrées", "/images/crepes.webp", "2f2cb76b-9438-11ef-ad19-d8bbc1515316", NOW(), NOW()),
    ( UUID(), "Quiche Lorraine", "quiche-lorraine", "Recette de quiche lorraine", "/images/quiche-lorraine.webp", "2f2cb76b-9438-11ef-ad19-d8bbc1515316", NOW(), NOW()),
    ( UUID(), "Tarte aux pommes", "tarte-aux-pommes", "Recette de tarte aux pommes", "/images/tarte-aux-pommes.webp", "2f2cbcb9-9438-11ef-ad19-d8bbc1515316", NOW(), NOW());