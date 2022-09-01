import Course from "../models/course_model.js";

class CourseService {

    constructor() {
        this.course = Course;
    }

    async createCourse(data) {
        const course = await this.course.create(data);
        return course;
    }

    async findAllCourses(branchId) {
        const courses = await this.course.find({ branchId });
        return courses;
    }

    async findCourseById(id) {
        const course = await this.course.findById(id);
        return course;
    }

    async updateCourseById(id, data) {
        const course = await this.course.findByIdAndUpdate(id, data, { new: true });
        return course;
    }

    async deleteCourseById(id) {
        const course = await this.course.findByIdAndDelete(id);
        return course;
    }

}
export default CourseService