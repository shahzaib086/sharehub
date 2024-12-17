const db = require("../../config/connection.js");
const elasticDB = require("../../config/es-connection.js");
const utils = require('../helpers/utility.js');  
// const status = require('../helpers/constants.js');
// const dayjs = require('dayjs');


class ApiToken {
    constructor() {
        this.tableName = 'api_token';
    }

    getCollection() {
        return db(this.tableName);
    }

    // where(data,columns=null) {
    //   return db(this.tableName).where(data).select(columns??'*');
    // }

    // insert(data) {
    //   return db(this.tableName).insert(data);
    // }

    getAll() {
        return db(this.tableName).select('*');
    }

    getById(id) {
        return db(this.tableName).where({ id }).first();
    }

    getByEncId(encId) {
        let id = utils.decrypt(encId);
        return db(this.tableName).where({ id }).first();
    }

    create(item) {
        return db(this.tableName).insert(item, ['id']);
    }

    updateById(id, item) {
        return db(this.tableName).where({ id }).update(item, ['id']);
    }

}

module.exports = ApiToken;