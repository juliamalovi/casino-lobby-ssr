function mapGamesData(gamesList) {
    const categoriesMap = new Map();
    const providersMap = new Map();
    const featuresMap = new Map();
    const themesMap = new Map();

    gamesList.filter(game => game.active).forEach(game => {
        game.cats.map(category => {
            const newCategory = {
                id: category.id,
                name: category.title,
            };
            if (!categoriesMap.has(category.id)) {
                categoriesMap.set(category.id, newCategory);
            }
            return newCategory;
        });

        const newProvider = {
            id: game.provider,
            name: game.provider_title,
        };

        if (!providersMap.has(newProvider.id)) {
            providersMap.set(newProvider.id, newProvider);
        }

        game.feats.map(feature => {
            const newFeature = {
                id: feature.id,
                name: feature.title,
            };
            if (!featuresMap.has(feature.id)) {
                featuresMap.set(feature.id, newFeature);
            }
            return newFeature;
        });

        game.thms.map(theme => {
            const newTheme = {
                id: theme.id,
                name: theme.title,
            };
            if (!themesMap.has(theme.id)) {
                themesMap.set(theme.id, newTheme);
            }
            return newTheme;
        });
    });


    return {
        categories: Array.from(categoriesMap.values()),
        providers: Array.from(providersMap.values()),
        features: Array.from(featuresMap.values()),
        themes: Array.from(themesMap.values()),
    }

}

module.exports = {
    mapGamesData
};