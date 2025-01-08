//js
const status = require('../../helpers/constants.js');
const utils = require('../../helpers/utility.js'); 
const Post = require('../../models/postES.js');
const User = require('../../models/userES.js');
const Category = require('../../models/categoryES.js');
// const {sendOTPEmail} = require('../../helpers/email-module.js');
const dayjs = require('dayjs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, './assets/posts/');
    },    
    filename: function (req, file, cb) {
        const fileExtension = file.originalname.split('.').pop(); // Get the file extension
        const uniqueFileName = `${utils.uuid4()}.${fileExtension}`;
        cb(null, uniqueFileName);
    }
});

const uploadItemImage = multer({
    storage: storage,
    // limits: {
    //     fileSize: 1024 * 1024 * 10
    // },      
    }).fields(
    [
        {
            name:'image',
            maxCount: 1
        },			
    ]
);

const createItem = async (req, res) => {
    let { title, price, pickup_address, description, expiry_date, category_id } = req.body;

    try {
        const user = req.session.auth;
        let { image } = req.files;

        const postModel = new Post();
        const categoryModel = new Category();
        const category = await categoryModel.getById(category_id);

        const insertData = {
            title, 
            username: user.name,
            type:'sell', 
            price: price ?? 0,
            category_id,
            category: category.name,
            pickup_address,
            description,
            expiry_date,
            lat: '45.12323',
            lng: '65.12323',
            labels:[],
            is_sold:0,
            status: 1,
            image: '/assets/posts/'+image,
            created_at: dayjs(),
            updated_at: dayjs(),
            created_by_id: user.id
        }

        const postId = await postModel.create(insertData);
        if (postId) {

            return res.json({
                status: status.SUCCESS_STATUS,
                message: 'Post created successfully.',						
                data: { }
            });
                    
        } else {
            return res.json({
                status: status.FAILURE_STATUS,
                message: 'Failed to create post!',						
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
    createItem,
    uploadItemImage
};