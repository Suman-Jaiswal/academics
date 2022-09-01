import mongoose from 'mongoose'

const branchSchema = mongoose.Schema({
    branchId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    program: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Branch = mongoose.model('Branch', branchSchema)

export default Branch