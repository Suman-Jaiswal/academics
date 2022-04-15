import express from 'express'
import LinkController from '../controllers/link_controller.js'
const router = express.Router()

const linkController = new LinkController()

// express router method to create route for creating user
router.route('/').post(linkController.addLinks)

// express router method to create route for getting all users
router.route('/').get(linkController.getLinks)

router.route('/delete').post(linkController.removeLinksByParentId)

// express router method to create route for getting users by id
router.route('/link').get(linkController.getLinkByParentId)

router.route('/:id').get(linkController.getLinkById)

router.route('/:id').post(linkController.editLinkById)

// express router method to delete route for getting users by id
router.route('/:id').delete(linkController.removeLink)

export default router
