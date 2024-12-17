//js
const status = require('../../helpers/constants.js');
const utils = require('../../helpers/utility.js'); 
// const User = require('../../models/user.js');
const Category = require('../../models/categoryES.js');
// const {sendOTPEmail} = require('../../helpers/email-module.js');


const seedCategories = async (req, res) => {

    try {
        const categoryModel = new Category();

        const insertData = [
            { name: "Food" },
            { name: "Clothing" },
            { name: "Books" },
            { name: "Electronics" },
            { name: "Furniture" },
            { name: "Toys" },
            { name: "Stationery" },
            { name: "Appliances" },
            { name: "Household Items" },
            { name: "Tools" },
            { name: "Services" },
            { name: "Gardening" },
            { name: "Pet Supplies" },
            { name: "Health & Wellness" },
            { name: "Office Supplies" },
            { name: "Travel Items" },
            { name: "Events & Activities" }
        ];

        const userId = await categoryModel.createBulk(insertData);
        
        return res.json({
            status: status.SUCCESS_STATUS,
            message: 'Account created successfully! Please verify your email address to continue.',						
            data: {
                // auth_token: auth_token,
                user_id: userId
            }
        });
                    
           

    } catch (error) {
        return res.json({
            status: status.FAILURE_STATUS,
            message: error.message,						                
            data: {}
        });      
    }
}

module.exports =  {
    seedCategories,
};