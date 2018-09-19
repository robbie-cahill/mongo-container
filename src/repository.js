"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Create a new instance of this class for each collection
 * must always be created with createLinkRepository()
 */
class Repository {
    constructor(mongoContainer, collectionName) {
        this.mongoContainer = mongoContainer;
        this.collectionName = collectionName;
    }
    async getCollection() {
        if (!this.collection) {
            const db = await this.mongoContainer.getDb();
            this.collection = db.collection(this.collectionName);
        }
        return Promise.resolve(this.collection);
    }
    async findOne(args) {
        let collection = await this.getCollection();
        let result = collection.findOne(args);
        return Promise.resolve(result);
    }
    async updateOne(query, document, options) {
        let collection = await this.getCollection();
        collection.updateOne(query, { $set: document }, options);
        return Promise.resolve();
    }
    async upsert(query, document) {
        await this.updateOne(query, document, {
            upsert: true
        });
    }
    async deleteOne(query) {
        let collection = await this.getCollection();
        collection.deleteOne(query);
    }
    async find(query = null) {
        let result = [];
        let collection = await this.getCollection();
        if (query !== null) {
            result = collection.find(query).toArray();
        }
        else {
            result = collection.find(); // will return everything
        }
        return Promise.resolve(result);
    }
    async addOne(document) {
        let collection = await this.getCollection();
        await collection.insertOne(document);
        return Promise.resolve();
    }
}
exports.Repository = Repository;
function createRepository(mongoContainer, collectionName) {
    const repository = new Repository(mongoContainer, collectionName);
    return repository;
}
exports.createRepository = createRepository;
//# sourceMappingURL=repository.js.map