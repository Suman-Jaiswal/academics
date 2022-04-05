import express from 'express'
import CourseController from '../controllers/course_controller.js'
const router = express.Router()

const courseController = new CourseController()

// express router method to create route for creating user
router.route('/').post(courseController.addCourse)

// express router method to create route for getting all users
router.route('/').get(courseController.getCourses)

// express router method to create route for getting users by id
router.route('/course').get(courseController.getCourseByParameters)

router.route('/:id').get(courseController.getCourseById)

router.route('/:id').post(courseController.editCourseById)

// express router method to delete route for getting users by id
router.route('/:id').delete(courseController.removeCourse)

export default router
