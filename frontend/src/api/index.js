import axios from "axios";

const api = process.env.REACT_APP_API

// slot api
export const fetchSlots = () => axios.get(api + '/slots')
export const addSlot = (doc) => axios.post(api + '/slots', doc)
export const deleteSlotsByCourseId = (courseId) => axios.post(api + '/slots/delete', { courseId })
export const deleteSlotById = (id) => axios.delete(api + '/slots/' + id)

//course api
export const fetchCourses = () => axios.get(api + '/courses')
export const fetchCourseById = (id) => axios.get(api + '/courses/' + id)
export const deleteCourseById = (id) => axios.delete(api + '/courses/' + id)
export const addCourse = (doc) => axios.post(api + '/courses', doc)
export const editCourse = (id, doc) => axios.post(api + '/courses/' + id, doc)

// link api
export const fetchLinks = () => axios.get(api + '/links')
export const addLinks = (arr) => axios.post(api + '/links', { arr })
export const deleteLinkById = (id) => axios.delete(api + '/links/' + id)
export const deleteLinksByParentId = (parentId) => axios.post(api + '/links/delete', { parentId })



