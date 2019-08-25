import {
    SET_LOCALE, UPDATE_CONNECTION_STATUS
} from './action-types'
import { en } from '../../../../resources/en';
import { ar } from '../../../../resources/ar';


/**
 * Module internal initial state
 */
const initialState = {
    currentLocale: null,
    currentResource: null,
    connectionStatus: false,
    languageID:1,
    currentDirection: null,
    islangChang:false,
};  


/**
 * Check dispatched action and update state accordingly
 * @param {Object} state 
 * @param {Object} action 
 * @returns {Function} 
 */

const reducer = (state = initialState, {type, payload = null}) => {
    switch (type) {
        case SET_LOCALE: 
            return setLocale(state, payload)
        case UPDATE_CONNECTION_STATUS: 
            return updateConnectionStatus(state, payload)
        default:
            return state;
    }
} 

function setLocale(state, payload){
    localStorage.setItem('currentLocale', payload)
    return {
        ...state,
        currentLocale: payload,
        currentResource: payload === 'english' ? en : ar, currentDirection: payload === 'en' ? 'ltr' : 'rtl',
        languageID: payload === 'english'?   1: 2,
        islangChang:state.currentLocale == payload || state.currentLocale == null ? false :true
    }
}

function updateConnectionStatus(state, payload){
    return {
        ...state, connectionStatus: payload
    }
}

export default reducer