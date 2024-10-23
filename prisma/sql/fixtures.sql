USE `g4cuisiner-db`;

INSERT INTO
    `fruit` ( `id`, `name`, `description`, `imageUrl`, `createdAt`, `updatedAt` )
VALUES
    ( UUID(), "Kiwi", "Fruit exotique", "/images/kiwi.webp", NOW(), NOW() ),
    ( UUID(), "Mangue", "Fruit exotique", "/images/mangue.webp", NOW(), NOW() ),
    ( UUID(), "Ananas", "Fruit exotique", "/images/ananas.webp", NOW(), NOW() );