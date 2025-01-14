//js
const status = require('../../helpers/constants.js');
const Category = require('../../models/categoryES.js');
const UserFavorite = require('../../models/userFavoriteES.js');
const dayjs = require('dayjs');


const createFavorite = async (req, res) => {
    let { category_id } = req.body;
    try {
        const user = req.session.auth;

        const categoryModel = new Category();
        const favoriteModel = new UserFavorite();
        const category = await categoryModel.getById(category_id);

        if( category ) {

            const insertData = {
                user_id: user.id, 
                user_name: user.name, 
                category_id: category_id,
                category_name: category.name,
                created_at: dayjs(),
            }
    
            await favoriteModel.create(insertData);

            return res.json({
                status: status.SUCCESS_STATUS,
                message: 'Category added to favorite successfully.',						
                data: { }
            });
                    
        } else {
            return res.json({
                status: status.FAILURE_STATUS,
                message: 'Category not found!',						
                data: {}
            });
        }
        
    } catch (error) {
        return res.json({
            status: status.FAILURE_STATUS,
            message: error.message,						                
            data: {}
        });      
    }
}

module.exports =  {
    createFavorite,
};