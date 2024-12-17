const elasticDB = require("../../config/es-connection.js");

class User {

    schema = [
        '_id',
        'name',
        'email',
        'password',
        'lat',
        'lng',
        'role_id',
        'otp_code',
        'otp_created_at',
        'status',
        'signup_step',
        'is_email_verified',
        'email_verified_at',
        'profile_image',
        'joined_at',
        'password',
    ]

    constructor() {
        this.tableName = 'users';
    }

    async getById(id) {
        try {
            const result = await elasticDB.get({
                index: this.tableName,
                id: id,
                _source: this.schema,
            });
            const data = result.body._source
            data.id = result.body._id
            return data;
        } catch (err) {
            console.error("Error:", err);
            return null;
        }
    }

    async getByEmail(email) {
        try {
            const queryBody = {
                query: {
                    term: {
                        "email.keyword": email
                    }
                }
            };
    
            const result = await elasticDB.search({
                index: this.tableName,
                body: queryBody,
                _source: this.schema,
                size: 1
            });

            if (result.body.hits.total.value > 0) {
                const user = result.body.hits.hits[0]._source;
                user.id = result.body.hits.hits[0]._id;
                return user;
            } else {
                return null;
            }
        } catch (err) {
            console.error("Error:", err);
            return null;
        }
    }

    async create(user) {
        try {
            const result = await elasticDB.index({
                index: this.tableName,
                body: user
            });
            return result.body._id;
        } catch (err) {
            console.error("Error:", err);
            return false;
        }
    }

    async updateById(id, data) {
        try {
            const result = await elasticDB.update({
                index: this.tableName,
                id: id,
                body: {
                    doc: data
                }
            });
            return result.body._id;
        } catch (err) {
            console.error("Error:", err);
            return false;
        }
    }

    async checkEmailExist(email, userId = null) {
        try {

            const queryBody = {
                query: {
                    bool: {
                        must: [
                            { term: { "email.keyword": email } }
                        ],
                        must_not: userId ? [
                            { term: { _id: userId } }
                        ] : []
                    }
                }
            };
    
            const result = await elasticDB.search({
                index: this.tableName,
                body: queryBody,
                size: 1
            });

            if (result.body.hits.total.value > 0) {
                return result.body.hits.hits[0]._source;
            }
    
            return null;
        } catch (err) {
            console.error("Error:", err);
            return null;
        }
    }

}

module.exports = User;