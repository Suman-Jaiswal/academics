import express from 'express'
import SlotController from '../controllers/slot_controller.js'
const router = express.Router()

const slotController = new SlotController()

// express router method to create route for creating user
router.route('/').post(slotController.addSlot)

// express router method to create route for getting all users
router.route('/').get(slotController.getSlots)

router.route('/delete').post(slotController.removeSlotsByCourseId)

// express router method to create route for getting users by id
router.route('/:id').get(slotController.getSlotById)

router.route('/slot').get(slotController.getSlotByParameters)

// express router method to delete route for getting users by id
router.route('/:id').delete(slotController.removeSlot)

export default router
