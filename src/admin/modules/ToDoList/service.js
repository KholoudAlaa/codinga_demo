import { postResource, getResource } from '../../../network'

/**
 * Handles login request
 * @param {Object} payload
 * @param {string} payload.username
 * @param {string} payload.password
 * @param {function} onSuccess
 * @param {function} onError
 * @returns {function} dispatch
 */

export function addList(payload,onSuccess, onError){
    return dispatch => {
        postResource('/api/addList',JSON.stringify(payload), (res) => { 
            onSuccess(res)
        }, (err) => {
            onError(err)
        },false)
    }
}

export function GetList(onSuccess,onError){
    return dispatch => {
        getResource('/api/getList', (res) => { 
            onSuccess(res)
        }, (err) => {
            onError(err)
        })
    }
}

export function EditList(payload,onSuccess,onError){
    return dispatch => {
        postResource('/api/editList',JSON.stringify(payload), (res) => { 
            onSuccess(res)
        }, (err) => {
            onError(err)
        },false)
    }
}

export function DeleteList(id,onSuccess,onError){
    return dispatch => {
        postResource('/api/deleteList', JSON.stringify({Id : id}), res => {
            onSuccess(res)
        }, (err) => {
            onError(err)
        })
    }
}





