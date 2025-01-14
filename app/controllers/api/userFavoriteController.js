const Category = require('../../models/userFavoriteES');
const categoryModel = new Category();

const getFavorites = async (req, res) => {
    try {
        const userId = req.params.userId;
        const favoriteItems = await categoryModel.getFavoriteItemsByUserId(userId);

        return res.json({
            status: 'SUCCESS',
            message: 'Favorite items retrieved successfully.',
            data: favoriteItems
        });
    } catch (error) {
        console.error("Error fetching favorite items:", error);
        return res.status(500).json({
            status: 'FAILURE',
            message: 'Failed to retrieve favorite items!',
            data: {}
        });
    }
};

module.exports = { getFavorites };
