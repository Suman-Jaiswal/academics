import Link from "../models/link_model.js";

class LinkService {

    constructor() {
        this.link = Link;
    }

    async createLinks(array) {
        const links = await this.link.insertMany(array);
        return links;
    }

    async findAllLinks() {
        const links = await this.link.find();
        return links;
    }

    async findLinkById(id) {
        const link = await this.link.findById(id);
        return link;
    }

    async findLinkByParentId(parentId) {
        const link = await this.link.find({ parentId });
        return link;
    }

    async deleteLinkById(id) {
        const link = await this.link.findByIdAndDelete(id);
        return link;
    }

    async updateLinkById(id, data) {
        const link = await this.link.findByIdAndUpdate(id, data, { new: true });
        return link;
    }

    async deleteLinksByParentId(parentId) {
        const link = await this.link.deleteMany({ parentId });
        return link;
    }

}
export default LinkService