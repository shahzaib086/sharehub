const elasticDB = require("../../config/es-connection.js");

class Post {

    schema = [
        '_id',
        'title',
        'type',
        'price',
        'pickup_address',
        'description',
        'expiry_date',
        'lat',
        'lng',
        'labels',
        'is_sold',
        'status',
        'image',
        'created_at',
        'updated_at',
        'created_by_id',
        'username',
        'category_id',
        'category',
    ]

    constructor() {
        this.tableName = 'posts';
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

    async getPaginatedPosts({ page = 1, limit = 10, category_id = null, keyword = null }) {
        try {
            const queryBody = {
                from: (page - 1) * limit,
                size: limit,
                query: {
                    bool: {
                        must: [],
                        filter: [
                            { term: { status: 1 } }
                        ]
                    }
                },
                sort: [{ created_at: { order: "desc" } }]
            };
    
            if (category_id) {
                queryBody.query.bool.filter.push({ term: { "category_id.keyword": category_id } });
            }
    
            if (keyword) {
                queryBody.query.bool.must.push({
                    multi_match: {
                        query: keyword,
                        fields: ["title^2", "username"],
                        fuzziness: "AUTO",
                        operator: "or"
                    }
                });
            }
    
            const result = await elasticDB.search({
                index: this.tableName,
                body: queryBody
            });
    
            const posts = result.body.hits.hits.map(hit => {
                const data = hit._source;
                data.id = hit._id;
                return data;
            });
    
            return {
                posts,
                pagination: {
                    total: result.body.hits.total.value,
                    currentPage: page,
                    totalPages: Math.ceil(result.body.hits.total.value / limit),
                    limit
                }
            };
    
        } catch (error) {
            console.error("Error fetching posts:", error);
            return {
                posts: [],
                pagination: {
                    total: 0,
                    currentPage: page,
                    totalPages: 0,
                    limit
                }
            };
        }
    }
    
}

module.exports = Post;