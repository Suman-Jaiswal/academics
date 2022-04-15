import asyncHandler from 'express-async-handler'
import LinkService from '../services/link_service.js';

class LinkController {

    constructor() {
        this.linkService = new LinkService()
    }

    addLinks = asyncHandler(async (req, res) => {
        const { arr } = req.body
        const links = await this.linkService.createLinks(arr);
        res.json(links)
    })

    getLinks = asyncHandler(async (req, res) => {
        const Links = await this.linkService.findAllLinks();
        res.json(Links)
    })

    getLinkById = asyncHandler(async (req, res) => {
        const link = await this.linkService.findLinkById(req.params.id);
        res.json(link)
    })

    getLinkByParentId = asyncHandler(async (req, res) => {
        const link = await this.linkService.findLinkByParentId(req.body.parentId);
        res.json(link)
    })

    editLinkById = asyncHandler(async (req, res) => {
        const { id } = req.params
        const data = req.body
        const link = await this.linkService.updateLinkById(id, data);
        res.json(link)
    })

    removeLink = asyncHandler(async (req, res) => {
        const link = await this.linkService.deleteLinkById(req.params.id)
        res.json(link)
    })

    removeLinksByParentId = asyncHandler(async (req, res) => {
        const { parentId } = req.body
        if (parentId === "") {
            return
        }
        const link = await this.linkService.deleteLinksByParentId(parentId)
        res.json(link)
    })

}

export default LinkController



