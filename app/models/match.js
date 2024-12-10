const db = require("../../config/connection.js");
const config = require('../../config/app.js');
const utils = require('../helpers/utility.js');  
const status = require('../helpers/constants.js');
const dayjs = require('dayjs');


class Match {
    constructor() {
        this.tableName = 'matches';
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

    async getSeasonMatches(season_id) {
        return await this.getCollection()
        .where({ season_id })
        .where('matches.status',status.MATCH_STATUS_FINISHED )
        .leftJoin('teams AS t1', 't1.id', 'matches.team_one_id')
        .leftJoin('teams AS t2', 't2.id', 'matches.team_two_id')
        .orderBy('matches.created_at', 'desc')
        .select(
            'matches.*', 
            't1.title AS team_one_name', 
            't1.image AS team_one_image',
            't2.title AS team_two_name',
            't2.image AS team_two_image',
        )
        .groupBy('matches.id', 't1.title', 't2.title', 't1.image', 't2.image');
    }

    async getTeamMatches(team_id) {
        return await this.getCollection()
        .where('matches.team_one_id', team_id )
        .orWhere('matches.team_two_id', team_id )
        .leftJoin('teams AS t1', 't1.id', 'matches.team_one_id')
        .leftJoin('teams AS t2', 't2.id', 'matches.team_two_id')
        .orderBy('matches.match_time', 'desc')
        .orderBy('matches.match_date', 'desc')
        .select(
            'matches.*', 
            't1.title AS team_one_name', 
            't1.image AS team_one_image',
            't2.title AS team_two_name',
            't2.image AS team_two_image',
        )
        .groupBy('matches.id', 't1.title', 't2.title', 't1.image', 't2.image');
    }

}

module.exports = Match;