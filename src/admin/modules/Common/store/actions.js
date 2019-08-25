import {
    SET_LOCALE,
    UPDATE_CONNECTION_STATUS,
} from './action-types'

export function setLocale(payload){
    return {
        type: SET_LOCALE,
        payload,
    }
}

export function updateConnectionStatus(payload){
    return {
        type: UPDATE_CONNECTION_STATUS,
        payload,
    }
}
