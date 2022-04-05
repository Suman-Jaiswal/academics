import Slot from "../models/slot_model.js";

class SlotService {

    constructor() {
        this.slot = Slot;
    }

    async createSlot(data) {
        const slot = await this.slot.create(data);
        return slot;
    }

    async findAllSlots() {
        const slots = await this.slot.find();
        return slots;
    }

    async findSlotById(id) {
        const slot = await this.slot.findById(id);
        return slot;
    }

    async findSlotByParameters(day, time) {
        const slot = await this.slot.find({ day: day, startTime: time });
        return slot;
    }

    async deleteSlotById(id) {
        const slot = await this.slot.findByIdAndDelete(id);
        return slot;
    }

    async deleteSlotsByCourseId(courseId) {
        const slot = await this.slot.deleteMany(courseId);
        return slot;
    }

}
export default SlotService