const db = require("../../config/connection.js");
const config = require('../../config/app.js');
const utils = require('../helpers/utility.js');  
const status = require('../helpers/constants.js');
const dayjs = require('dayjs');


class Division {
    constructor() {
        this.tableName = 'divisions';
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

    create(user,returnCol='*') {
        return db(this.tableName).insert(user, [returnCol]);
    }

    updateById(id, user) {
        return db(this.tableName).where({ id }).update(user, ['id']);
    }

    //   delete(id) {
    //     return db(this.tableName).where({ id }).del();
    //   }

}

module.exports = Division;