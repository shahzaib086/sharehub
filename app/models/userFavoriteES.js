const elasticDB = require("../../config/es-connection.js");

class Category {

    schema = [
        '_id',
        'user_id',
        'user_name',
        'category_id',
        'category_name',
        'created_at',
    ]

    constructor() {
        this.tableName = 'favorite_categories';
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

    async getAll() {
        try {
            const result = await elasticDB.search({
                index: this.tableName,
                _source: this.schema,
                body: {
                    query: {
                        match_all: {}
                    }
                }
            });
    
            const data = result.body.hits.hits.map(hit => {
                return {
                    id: hit._id,
                    ...hit._source
                };
            });
    
            return data;
        } catch (err) {
            console.error("Error:", err);
            return [];
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

    async createBulk(data) {
        try {
            
            const body = data.flatMap(doc => [
                { index: { _index: this.tableName } },
                doc
            ]);
            
            const result = await elasticDB.bulk({
                body: body
            });
    
            if (result.body.errors) {
                console.error("Bulk insert errors:", result.body.items);
                return false;
            }
    
            return true;
        } catch (err) {
            console.error("Error:", err);
            return false;
        }
    }

    async getFavoriteItemsByUserId(userId) {
        try {
            // Fetch user's favorite categories
            const favoriteCategoriesResult = await elasticDB.search({
                index: this.tableName,
                _source: ['category_id'],
                body: {
                    query: {
                        match: { user_id: userId }
                    }
                }
            });

            const favoriteCategories = favoriteCategoriesResult.body.hits.hits.map(hit => hit._source.category_id);

            if (favoriteCategories.length === 0) {
                return [];
            }

            // Fetch items from the favorite categories
            const itemsResult = await elasticDB.search({
                index: this.itemsTable,
                body: {
                    query: {
                        terms: { category_id: favoriteCategories }
                    }
                }
            });

            return itemsResult.body.hits.hits.map(hit => ({
                id: hit._id,
                ...hit._source
            }));
        } catch (err) {
            console.error("Error fetching favorite items:", err);
            return [];
        }
    }

}

module.exports = Category;