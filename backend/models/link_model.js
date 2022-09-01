import mongoose from 'mongoose'

const linkSchema = mongoose.Schema({
    branchId: {
        type: String,
        required: true
    },
    parentId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
}, {
    timestamps: true
})

const Link = mongoose.model('Link', linkSchema)

export default Link