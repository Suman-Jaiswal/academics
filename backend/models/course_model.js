import mongoose from 'mongoose'

const courseSchema = mongoose.Schema({
    branchId: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    ltp: {
        type: String
    },
    credit: {
        type: Number
    },
    prof: {
        type: String
    },
    details: {
        type: String
    },
}, {
    timestamps: true
})

const Course = mongoose.model('Course', courseSchema)

export default Course