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

        default:
            return state
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
        ltp: ""
    }],
    loading: false,
    error: false,
}

function MyContextProvider(props) {

    const [state, dispatch] = useReducer(myReducer, initialState);

    useEffect(() => {
        console.log('myState', state)
    }, [state])

    return (
        <MyContext.Provider value={{ state, dispatch }}>
            {props.children}
        </MyContext.Provider>
    )
}
export default MyContextProvider