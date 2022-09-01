import axios from "axios";

const api = process.env.REACT_APP_API

// branch api
export const fetchBranches = () => axios.get(api + '/branches');
export const addBranch = (doc) => axios.post(api + '/branches', doc);
export const deleteBranch = (id) => axios.delete(api + '/branches/' + id);

// slot api
export const fetchSlots = (branchId) => axios.get(api + '/slots', { params: { branchId } })
export const addSlot = (doc) => axios.post(api + '/slots', doc)
export const deleteSlotsByCourseId = (courseId) => axios.post(api + '/slots/delete', { courseId })
export const deleteSlotById = (id) => axios.delete(api + '/slots/' + id)

//course api
export const fetchCourses = (branchId) => axios.get(api + '/courses', { params: { branchId } })
export const fetchCourseById = (id) => axios.get(api + '/courses/' + id)
export const deleteCourseById = (id) => axios.delete(api + '/courses/' + id)
export const addCourse = (doc) => axios.post(api + '/courses', doc)
export const editCourse = (id, doc) => axios.post(api + '/courses/' + id, doc)

// link api
export const fetchLinks = (branchId) => axios.get(api + '/links', { params: { branchId } })
export const addLinks = (arr) => axios.post(api + '/links', { arr })
export const deleteLinkById = (id) => axios.delete(api + '/links/' + id)
export const deleteLinksByParentId = (parentId) => axios.post(api + '/links/delete', { parentId })



