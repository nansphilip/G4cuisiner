USE `g4cuisiner-db`;

INSERT INTO
    `fruit` ( `id`, `name`, `slug`, `description`, `image`, `createdAt`, `updatedAt` )
VALUES
    ( UUID(), "Kiwi", "kiwi", "Fruit exotique", "/images/kiwi.webp", NOW(), NOW() ),
    ( UUID(), "Mangue", "mangue", "Fruit exotique", "/images/mangue.webp", NOW(), NOW() ),
    ( UUID(), "Ananas", "ananas", "Fruit exotique", "/images/ananas.webp", NOW(), NOW() );
