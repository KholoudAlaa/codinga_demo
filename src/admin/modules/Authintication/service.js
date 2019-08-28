import { postResource, getResource } from '../../../network'
import * as authActions from './store/actions';

/**
 * Handles login request
 * @param {Object} payload
 * @param {string} payload.username
 * @param {string} payload.password
 * @param {string} payload.clientId
 * @param {string} payload.clientSecret
 * @param {function} onSuccess
 * @param {function} onError
 * @returns {function} dispatch
 */

export function login(payload,onSuccess, onError){
    return dispatch => {
        postResource('/api/login',JSON.stringify(payload), (res) => { 
            dispatch(authActions.authLogin({
                accessToken: res.token,
            }))
            onSuccess(res)
        }, (err) => {
            onError(err)
        },false)
    }
}

/**
 * Handles register request
 * @param {Object} payload 
 * @param {string} payload.email
 * @param {string} payload.password
 * @param {string} payload.firstName
 * @param {string} payload.lastName
 * @param {string} payload.mobile
 * @param {string} payload.clientId
 * @param {string} payload.clientSecret
 * @param {number} payload.accountType
 * @param {function} onSuccess
 * @param {function} onError
 * @returns {function} dispatch
 */

export function register(payload, onSuccess, onError){
    return dispatch => {
        postResource('/api/signup', JSON.stringify(payload), (res) => {
            dispatch(authActions.authLogin({
                accessToken: res.token,
            }))
            onSuccess(res)
        }, (err) => {
            onError(err)
        },false)
    }
}




