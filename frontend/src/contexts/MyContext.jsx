import { createContext, useEffect, useReducer } from "react";

const myReducer = (state, action) => {
    switch (action.type) {
        //courses
        case 'FETCH_COURSES':
            return {
                ...state,
                courses: [...state.courses, ...action.payload],
                loading: false,
                error: false,
            }
        case 'ADD_COURSE':
            return {
                ...state,
                courses: [...state.courses, action.payload],
                loading: false,
                error: false,
            }
        case 'EDIT_COURSE':
            const ind = state.courses.findIndex(o => o._id === action.payload.id)

            state.courses[ind] = { ...state.courses[ind], ...action.payload.data }

            return {
                ...state,
                // courses: newArr,
                // loading: false,
                // error: false,
            }
        case 'DELETE_COURSE':
            const arr = state.courses.filter(x => x._id !== action.payload)
            return {
                ...state,
                courses: arr,
                loading: false,
                error: false,
            }


        //slots
        case 'FETCH_SLOTS':
            return {
                ...state,
                slots: [...state.slots, ...action.payload],
                loading: false,
                error: false,
            }
        case 'ADD_SLOT':
            return {
                ...state,
                slots: [...state.slots, action.payload],
                loading: false,
                error: false,
            }
        case 'DELETE_SLOT':
            const arr2 = state.slots.filter(x => x._id !== action.payload)
            return {
                ...state,
                slots: arr2,
                loading: false,
                error: false,
            }
        case 'DELETE_SLOTS_BY_COURSEID':
            const arr3 = state.slots.filter(x => x.courseId !== action.payload)
            return {
                ...state,
                slots: arr3,
                loading: false,
                error: false,
            }

        default:
            return state

        // links
        case 'FETCH_LINKS':
            return {
                ...state,
                links: [...state.links, ...action.payload],
                loading: false,
                error: false,
            }

        case 'ADD_LINKS':
            return {
                ...state,
                links: [...state.links, ...action.payload],
                loading: false,
                error: false,
            }

        case 'REMOVE_LINK':
            return {
                ...state,
                links: state.links.filter(l => l._id !== action.payload),
                loading: false,
                error: false,
            }
    }
}

export const MyContext = createContext()

const initialState = {
    courses: [
        {
            _id: "",
            code: "",
            name: "",
            links: [""],
            ltp: ""
        }
    ],
    slots: [{
        _id: "",
        code: "",
        name: "",
        links: [""],
        ltp: "",
        startTime: ""
    }],
    links: [{
        parentId: "",
        title: "",
        url: "",
        description: ""
    }
    ],
    loading: false,
    error: false,
}

function MyContextProvider(props) {

    const [state, dispatch] = useReducer(myReducer, initialState);

    useEffect(() => {
        console.log('courses', state.courses)
        console.log('slots', state.slots)
        console.log('links', state.links)
    }, [state])

    return (
        <MyContext.Provider value={{ state, dispatch }}>
            {props.children}
        </MyContext.Provider>
    )
}
export default MyContextProvider