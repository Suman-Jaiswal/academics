import axios from "axios";

const api = "http://127.0.0.1:5000/api"

// slot api
export const fetchSlots = () => axios.get(api + '/slots')
export const addSlot = (doc) => axios.post(api + '/slots', doc)
export const deleteSlotsByCourseId = (courseId) => axios.delete(api + '/slots', { courseId })
export const deleteSlotById = (id) => axios.delete(api + '/slots/' + id)

//course api
export const fetchCourses = () => axios.get(api + '/courses')
export const fetchCourseById = (id) => axios.get(api + '/courses/' + id)
export const deleteCourseById = (id) => axios.delete(api + '/courses/' + id)
export const addCourse = (doc) => axios.post(api + '/courses', doc)
export const editCourse = (id, doc) => axios.post(api + '/courses/' + id, doc)





