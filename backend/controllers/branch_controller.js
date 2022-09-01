import asyncHandler from 'express-async-handler'
import BranchService from '../services/branch_service.js';

class BranchController {

    constructor() {
        this.branchService = new BranchService()
    }

    addBranch = asyncHandler(async (req, res) => {
        const data = req.body
        const branch = await this.branchService.createBranch(data);
        res.json(branch)
    })

    getBranches = asyncHandler(async (req, res) => {
        const branches = await this.branchService.findAllBranches();
        res.json(branches)
    })

    removeBranch = asyncHandler(async (req, res) => {
        const branch = await this.branchService.deleteBranchById(req.params.id)
        res.json(branch)
    })

}

export default BranchController



