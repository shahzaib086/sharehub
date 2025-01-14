const UserFavorite = require('../../models/userFavoriteES');
const Category = require('../../models/userFavoriteES');
const user_favorite_Model = new UserFavorite();

const getFavorites = async (req, res) => {
    try {
        // const userId = req.params.userId;
        const user = req.session.auth;
        const favoriteItems = await user_favorite_Model.getFavoriteItemsByUserId(user.id);
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
