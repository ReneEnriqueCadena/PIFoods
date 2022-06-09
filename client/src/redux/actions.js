// dispatch envia action al reducer, reducer se encarga de editar los estados, y se actualizan los componentes
import axios from 'axios';
export const OBTENER_TODOS = 'OBTENER TODOS';
export const RUTA_GET = 'http://localhost:3001/recipes';
export const FILTER = 'FILTER';
export const DETAILS = "DETAILS";
export const RELOAD = 'RELOAD';
export const RELOADSERCH = 'RELOADSERCH';

export function obtener(){
    return async function pedido(dispatch) {
        let pedidoBack = await axios.get(RUTA_GET)
        return dispatch({
            type: OBTENER_TODOS,
            payload: pedidoBack.data,
        })
    }
}

export function reload(){
    return function delet(dispatch){
        return dispatch({
            type: RELOAD,
            payload: [],
        })
    }
}

export function reloadserch(){
    return function delet2(dispatch){
        return dispatch({
            type: RELOADSERCH,
            payload: [],
        })
    }
}

export function filter(value) {
    return async function pedido2(dispatch) {
        let pedidoBack2 = await axios.get(RUTA_GET+"?name="+value)
        return dispatch({
            type: FILTER,
            payload: pedidoBack2.data,
        })
    }
}

export function details(value) {
    return async function perdido3(dispatch) {
        let pedidoBack3 = await axios.get(RUTA_GET+"/"+value)
        return dispatch({
            type: DETAILS,
            payload: pedidoBack3
        })
    }
}



