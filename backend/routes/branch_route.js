import express from 'express'
import BranchController from '../controllers/branch_controller.js'
const router = express.Router()

const branchController = new BranchController()

// express router method to create route for creating user
router.route('/').post(branchController.addBranch)

// express router method to create route for getting all users
router.route('/').get(branchController.getBranches)

// express router method to delete route for getting users by id
router.route('/:id').delete(branchController.removeBranch)

export default router
