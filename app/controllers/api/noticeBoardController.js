//js
const status = require('../../helpers/constants.js');
const utils = require('../../helpers/utility.js'); 
const Season = require('../../models/season.js');
const SeasonMatch = require('../../models/seasonMatch.js');
const Team = require('../../models/team.js');
const TeamPlayer = require('../../models/teamPlayer.js');
const TeamStat = require('../../models/teamStat.js');
const Match = require('../../models/match.js');
const NoticeBoard = require('../../models/noticeBoard.js');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, './assets/notice/');
    },    
    filename: function (req, file, cb) {
        const fileExtension = file.originalname.split('.').pop(); // Get the file extension
        const uniqueFileName = `${utils.uuid4()}.${fileExtension}`;
        cb(null, uniqueFileName);
    }
});

const uploadNoticeCover = multer({
    storage: storage,
    // limits: {
    //     fileSize: 1024 * 1024 * 10
    // },      
    }).fields(
    [
        {
            name:'cover_image',
            maxCount: 1
        },			
    ]
);


const createNotice = async (req, res) => {
    let { 
        title, 
        description,
        set_reminder,
        reminder_type,
        notice_date,
    } = req.body;
    let { cover_image } = req.files;

    try {
        const noticeModel = new NoticeBoard();
        let user = req.session.auth;
        
        let image = cover_image ? '/assets/notice/' + cover_image[0].filename : undefined;
        const createData = {
            created_by_id: user.id,
            title, 
            description,
            set_reminder,
            reminder_type,
            notice_date,
            cover_image: image,
            status: status.NOTICE_STATUS_ACTIVE
        };  

        const notice = await noticeModel.create(createData);

        return res.status(status.HTTP_SUCCESS).json({
            status: status.SUCCESS_STATUS,
            message: 'Notice created sucessfully',						                
            data: {
                notice: notice[0]
            }
        }); 

    } catch (error) {
        return res.status(status.HTTP_SERVER_ERROR).json({
            status: status.FAILURE_STATUS,
            message: error.message,						                
            data: {}
        });      
    }
}

const updateNotice = async (req, res) => {
    let { 
        notice_id, 
        title, 
        description,
        set_reminder,
        reminder_type,
        notice_date,
    } = req.body;
    let { cover_image } = req.files;

    try {
        // let user = req.session.auth;
        const noticeModel = new NoticeBoard();
        const notice = await noticeModel.getById(notice_id);
        if( !notice ){
            return res.status(status.HTTP_NOT_FOUND).json({
                status: status.FAILURE_STATUS,
                message: 'Notice not found',
                data: {},
            });
        }

        let image = cover_image ? '/assets/notice/' + cover_image[0].filename : undefined;
        const updateData = {
            title, 
            description,
            set_reminder,
            reminder_type,
            notice_date,
            cover_image: image,
            status: status.SEASON_STATUS_ACTIVE
        };  

        const updatedNotice = await noticeModel.updateById(notice_id, updateData);

        return res.status(status.HTTP_SUCCESS).json({
            status: status.SUCCESS_STATUS,
            message: 'Notice updated sucessfully',						                
            data: {
                notice: updatedNotice[0]
            }
        }); 

    } catch (error) {
        return res.status(status.HTTP_SERVER_ERROR).json({
            status: status.FAILURE_STATUS,
            message: error.message,						                
            data: {}
        });      
    }
}

const deleteNotice = async (req, res) => {
    let { 
        notice_id
    } = req.body;

    try {
        // let user = req.session.auth;
        const noticeModel = new NoticeBoard();
        const notice = await noticeModel.getById(notice_id);
        if( !notice ){
            return res.status(status.HTTP_NOT_FOUND).json({
                status: status.FAILURE_STATUS,
                message: 'Notice not found',
                data: {},
            });
        }

        await noticeModel.delete(notice_id);

        return res.status(status.HTTP_SUCCESS).json({
            status: status.SUCCESS_STATUS,
            message: 'Notice deleted sucessfully',						                
            data: { }
        }); 

    } catch (error) {
        return res.status(status.HTTP_SERVER_ERROR).json({
            status: status.FAILURE_STATUS,
            message: error.message,						                
            data: {}
        });      
    }
}

const noticeDetails = async (req, res) => {
    let { 
        notice_id, 
    } = req.body;

    try {
        const noticeModel = new NoticeBoard();
        // let user = req.session.auth;
        const notice = await noticeModel.getById(notice_id);
        if( !notice ){
            return res.status(status.HTTP_NOT_FOUND).json({
                status: status.FAILURE_STATUS,
                message: 'Notice not found',
                data: {},
            });
        }

        return res.status(status.HTTP_SUCCESS).json({
            status: status.SUCCESS_STATUS,
            message: 'Notice details',						                
            data: {
                notice: notice
            }
        }); 

    } catch (error) {
        return res.status(status.HTTP_SERVER_ERROR).json({
            status: status.FAILURE_STATUS,
            message: error.message,						                
            data: {}
        });      
    }
}

const getNoticeList = async (req, res) => {
    try{
        const noticeModel = new NoticeBoard();
        const notices = await noticeModel.getCollection()
        .orderBy('created_at','desc')
        .select('*');
        
        return res.status(status.HTTP_SUCCESS).json({
            status: status.SUCCESS_STATUS,
            message: 'Notice list',						                
            data: {
                notices
            }
        }); 
    } catch (error) {
        return res.status(status.HTTP_SERVER_ERROR).json({
            status: status.FAILURE_STATUS,
            message: error.message,						                
            data: {}
        });      
    }
}


module.exports =  {
    createNotice,
    updateNotice,
    deleteNotice,
    noticeDetails,
    getNoticeList,
    uploadNoticeCover,
};