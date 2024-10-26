USE `g4cuisiner-db`;

INSERT INTO
    `fruit` ( `id`, `name`, `slug`, `description`, `image`, `createdAt`, `updatedAt` )
VALUES
    ( UUID(), "Kiwi", "kiwi", "Fruit exotique", "/images/kiwi.webp", NOW(), NOW() ),
    ( UUID(), "Mangue", "mangue", "Fruit exotique", "/images/mangue.webp", NOW(), NOW() ),
    ( UUID(), "Ananas", "ananas", "Fruit exotique", "/images/ananas.webp", NOW(), NOW() );

INSERT INTO
    `recipe` ( `id`, `name`, `slug`, `description`, `image`, `createdAt`, `updatedAt` )
VALUES
    ( UUID(), "Tarte aux pommes", "tarte-aux-pommes", "Recette de tarte aux pommes", "/images/tarte-aux-pommes.webp", NOW(), NOW() ),
    ( UUID(), "Tarte aux fraises", "tarte-aux-fraises", "Recette de tarte aux fraises", "/images/tarte-aux-fraises.webp", NOW(), NOW() ),
    ( UUID(), "Tarte aux abricots", "tarte-aux-abricots", "Recette de tarte aux abricots", "/images/tarte-aux-abricots.webp", NOW(), NOW() );