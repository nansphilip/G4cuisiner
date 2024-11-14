module.exports = {
    // ... autres configurations
    module: {
        rules: [
            // Ajoutez cette règle pour le SVG
            {
                test: /\.svg$/,
                use: ["@svgr/webpack"],
            },
        ],
    },
};
