import mongoose from 'mongoose'

const slotSchema = mongoose.Schema({
    courseId: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true,
    },
    startTime: {
        type: Number,
        required: true,
    },
    endTime: {
        type: String
    },
    slotType: {
        type: String,
        enum: ['L', 'T', 'P']
    }
}, {
    timestamps: true
})

const Slot = mongoose.model('Slot', slotSchema)

export default Slot