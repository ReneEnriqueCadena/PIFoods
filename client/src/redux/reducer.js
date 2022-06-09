import { OBTENER_TODOS, FILTER, DETAILS, RELOAD, RELOADSERCH, REVIEWMATI } from "./actions";

const initialState = {
    foods: [],
    filtrados: [],
    detalle: [],
    diets: [],
    urlId: ""
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case OBTENER_TODOS:
            return {
                ...state,
                foods: action.payload,
            }
        case FILTER:
            return {
                ...state,
                filtrados: action.payload
            }
        case DETAILS:
            return {
                ...state,
                detalle: action.payload
            }
        case RELOAD:
            return {
                ...state,
                foods: action.payload,
            }
        case RELOADSERCH:
            return {
                ...state,
                filtrados: action.payload,
            }
        default:
            return state;
    }
}