import Branch from "../models/branch_model.js";

class BranchService {

    constructor() {
        this.branch = Branch;
    }

    async createBranch(data) {
        const branch = await this.branch.create(data);
        return branch;
    }

    async findAllBranches() {
        const branches = await this.branch.find();
        return branches;
    }

    async deleteBranchById(id) {
        const branch = await this.branch.findByIdAndDelete(id);
        return branch;
    }

}
export default BranchService