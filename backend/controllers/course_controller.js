import asyncHandler from 'express-async-handler'
import CourseService from '../services/course_service.js';

class CourseController {

    constructor() {
        this.courseService = new CourseService()
    }

    addCourse = asyncHandler(async (req, res) => {
        const data = req.body
        const course = await this.courseService.createCourse(data);
        res.json(course)
    })

    getCourses = asyncHandler(async (req, res) => {
        const { branchId } = req.query
        const courses = await this.courseService.findAllCourses(branchId);
        res.json(courses)
    })

    getCourseById = asyncHandler(async (req, res) => {
        const course = await this.courseService.findCourseById(req.params.id);
        res.json(course)
    })

    editCourseById = asyncHandler(async (req, res) => {
        const { id } = req.params
        const data = req.body
        const course = await this.courseService.updateCourseById(id, data);
        res.json(course)
    })

    removeCourse = asyncHandler(async (req, res) => {
        const course = await this.courseService.deleteCourseById(req.params.id)
        res.json(course)
    })

}

export default CourseController



