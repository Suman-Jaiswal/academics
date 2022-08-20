import mongoose from 'mongoose'

const courseSchema = mongoose.Schema({
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
    prof: {
        type: String
    },
    credit: {
        type: Number
    },
}, {
    timestamps: true
})

const Course = mongoose.model('Course', courseSchema)

export default Course