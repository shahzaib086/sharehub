const db = require("../../config/connection.js");
const config = require('../../config/app.js');
const utils = require('../helpers/utility.js');  
const status = require('../helpers/constants.js');
const dayjs = require('dayjs');


class User {

    tableName = 'users';

    playerProfileColumns = [
        this.tableName+'.id',
        this.tableName+'.first_name',
        this.tableName+'.last_name',
        this.tableName+'.email',
        this.tableName+'.phone_number',
        this.tableName+'.country_code',
        this.tableName+'.age',
        this.tableName+'.gender',
        this.tableName+'.position',
        this.tableName+'.hand_foot',
        this.tableName+'.profile_image',
        this.tableName+'.status',
    ];

    constructor() {
        // this.tableName = 'users';
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

    create(user) {
        return db(this.tableName).insert(user, ['id']);
    }

    updateById(id, user) {
        return db(this.tableName).where({ id }).update(user, ['id']);
    }

    async checkEmailExist(email,user=null) {
        let query = db(this.tableName).where({ email });

        if (user) {
            query = query.whereNot('id', user.id);
        }

        return await query.first();
    }

    //   delete(id) {
    //     return db(this.tableName).where({ id }).del();
    //   }

    async getPermissions(user) {
        let permissions = await db("role_permission")
        .join('permissions', 'permissions.id', '=', 'role_permission.permission_id')
        .where('role_permission.role_id', '=', user.role_id)
        .select('role_permission.role_id', 'role_permission.permission_id', 'permissions.name');
        return permissions.map(obj => obj.name);
    }

    getMProfileImage(item) {
        if( item.profile_image && (item.profile_image != '') ) {
            return config.app_base_url+item.profile_image;
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

module.exports = User;