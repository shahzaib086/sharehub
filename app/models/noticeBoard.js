const db = require("../../config/connection.js");
const config = require('../../config/app.js');
const utils = require('../helpers/utility.js');  
const status = require('../helpers/constants.js');
const dayjs = require('dayjs');


class NoticeBoard {
    constructor() {
        this.tableName = 'notice_board';
    }

    getCollection() {
        return db(this.tableName);
    }

    getAll() {
        return db(this.tableName).select('*');
    }

    getById(id,columns='*') {
        return db(this.tableName).where({ id }).first(columns);
    }

    getByEncId(encId) {
        let id = utils.decrypt(encId);
        return db(this.tableName).where({ id }).first();
    }

    create(user,returnCol=['*']) {
        return db(this.tableName).insert(user, returnCol);
    }

    updateById(id, user, returnCol=['*']) {
        return db(this.tableName).where({ id }).update(user, returnCol);
    }

    delete(id) {
        return db(this.tableName).where({ id }).del();
    }

    getMCoverImage(item) {
        if( item.cover_image && (item.cover_image != '') ) {
            return config.app_base_url+item.cover_image;
        }
        return ''
    }

    getMCreatedAt(item) {
        return item.created_at?dayjs(item.created_at).format(status.DATATABLE_TIMESTAMP_FORMAT):'';
    }

    getMUpdatedAt(item) {
        return item.updated_at?dayjs(item.updated_at).format(status.DATATABLE_TIMESTAMP_FORMAT):'';
    }

}

module.exports = NoticeBoard;