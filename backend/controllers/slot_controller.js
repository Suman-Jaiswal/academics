import asyncHandler from 'express-async-handler'
import SlotService from '../services/slot_service.js';

class SlotController {

    constructor() {
        this.slotService = new SlotService()
    }

    addSlot = asyncHandler(async (req, res) => {
        const data = req.body
        const slot = await this.slotService.createSlot(data);
        res.status(201).json(slot)
    })

    getSlots = asyncHandler(async (req, res) => {
        const slots = await this.slotService.findAllSlots();
        res.json(slots)
    })

    getSlotById = asyncHandler(async (req, res) => {
        const slot = await this.slotService.findSlotById(req.params.id)
        res.json(slot)
    })

    getSlotByParameters = asyncHandler(async (req, res) => {
        const { day, time } = req.body
        const slot = await this.slotService.findSlotByParameters(day, time)
        res.json(slot)
    })

    removeSlot = asyncHandler(async (req, res) => {
        const slot = await this.slotService.deleteSlotById(req.params.id)
        res.json(slot)
    })

    removeSlotsByCourseId = asyncHandler(async (req, res) => {
        const slot = await this.slotService.deleteSlotsByCourseId(req.body.courseId)
        res.json(slot)
    })

}

export default SlotController



