import axios from "axios";

// slot api
export const fetchSlots = () => axios.get('/slots')
export const addSlot = (doc) => axios.post('/slots', doc)
export const deleteSlotsByCourseId = (courseId) => axios.delete('/slots', { courseId })
export const deleteSlotById = (id) => axios.delete('/slots/' + id)

//course api
export const fetchCourses = () => axios.get('/courses')
export const fetchCourseById = (id) => axios.get('/courses/' + id)
export const deleteCourseById = (id) => axios.delete('/courses/' + id)
export const addCourse = (doc) => axios.post('/courses', doc)
export const editCourse = (id, doc) => axios.post('/courses/' + id, doc)





