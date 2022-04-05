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
    links: {
        type: Array,
        default: []
    },
    ltp: {
        type: String
    }
}, {
    timestamps: true
})

const Course = mongoose.model('Course', courseSchema)

export default Course