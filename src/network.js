/* eslint-disable no-throw-literal */

import store from '../src/store'
import { responseMessages } from './resources/responseMessages';
import { responseMessagesAR } from './resources/responseMessagesAR';
import { authLogout, authLogin } from './admin/modules/Authintication/store/actions';

var state = store.getState()
var currentLocale = state.common.currentLocale

var headers = new Headers()

function setToken(){
    headers.set('Accept', 'application/json')
    headers.set('Content-type', 'application/json')
    const token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : window.sessionStorage.getItem('access_token')
    var currentDateTime = new Date();
    // var expiryDateTime = new Date(expiryDate);
    headers.set('Accept-Language', localStorage.getItem('currentLocale') === 'english' ? 'en-US' : 'ar-EG')
    // if(token){
    //     if(expiryDateTime.getTime() < currentDateTime.getTime()){
    //         store.dispatch(refreshToken(token))
    //     }
    //     else {
    //         headers.set('Authorization', `Bearer ${token}`)
    //     }
    // }
    // else {
    //     store.dispatch(authLogout())
    // }
}

// function refreshToken(token) {
//     let body = {
//         token: token,
//         refreshToken: localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken') : window.sessionStorage.getItem('refreshToken'),
//         clientId: "FoundationAPI",
//         clientSecret: "FoundationSecretKey"
//     }
//     return async (dispatch) => {
//         const response = await fetch('/api/Auth/Refresh',{headers, body, method: 'post'})
//         await handleResponse(response, (res) => {
//             headers.set('Authorization', `Bearer ${res.data.accessToken}`)
//             dispatch(authLogin({
//                 token: res.data.accessToken,
//                 role: 'admin',
//                 refreshToken: res.data.refreshToken,
//                 token_expiry: res.data.tokenExpiration
//             }))
//         }, (error) => {
//             console.log(error)
//         })
//     }
// }

async function handleResponse(response, onSuccess, onFailure) {
    try {
        if(navigator.onLine){
            if(!response.ok  && response.status !== 201 && response.status !== 400){
                const contentType = response.headers.get("content-type")
                const data = await contentType && contentType.indexOf("application/json") !== -1 ?
                response.json() : response.text()
                handleHttpErrors(data, response.status, currentLocale)
            }
            else {
                const data = await response.json()
                if(response.ok || response.status == 201){
                    console.log(data)
                    onSuccess(data)
                }
                else if(response.status == 400)  {
                let errors = [
                     [currentLocale === 'ar' ? responseMessagesAR[data.responseCode] : responseMessages[data.responseCode]]
                    ]
                    throw { errors: errors, code: 400 }
                }
            }
        }
        else {
            throw { errors: [currentLocale === 'ar' ? 
            'لا يوجد إتصال بالإنترنت, يرجى المحاولة لاحقًا' : 
            'No internet connection, please try again!'], code: 503 }
        }
    } catch (error) {
        onFailure(error)
    }
}

function handleHttpErrors(data, code, currentLocale) {
    switch (code) {
        case 401:
            throw { errors: [currentLocale === 'ar' ? 'غير مصرح' : 'Not authorized'], code: code }
        case 403:
            throw { errors: [currentLocale === 'ar' ? 'غير مصرح' : 'Not authorized'], code: code }
        case 404: 
            throw { errors: [currentLocale === 'ar' ? 'الصفحة غير موجودة' : 'Page not found'], code: code}
        case 500: {
            throw { errors: [currentLocale === 'ar' ? 'خطأ داخلي بالخادم' : 'Internal server error'], code: code}
        }
        case 400: {
            throw { errors: [currentLocale === 'ar' ? 'ااااااااا  ' : 'testttt'], code: code}
        }
        default:
            throw { errors: [data.responseMessage ? data.responseMessage : 
                currentLocale === 'ar' ? 'حدث خطأ ما, رجاء المحاولة مجددًا' : 'Something went wrong'], code: code }
    }
}

function timeoutPromise(ms, promise) {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error("promise timeout"))
      }, ms);
      promise.then(
        (res) => {
          clearTimeout(timeoutId);
          resolve(res);
        },
        (err) => {
          clearTimeout(timeoutId);
          reject(err);
        }
      );
    })
  }

export const getResource = async (route, onSuccess, onFailure) => {
    setToken()
    try {
        const response = await timeoutPromise(15000, fetch(route, {headers}))
        await handleResponse(response, (data) => {
            onSuccess(data)
        }, (error) => {
            onFailure(error)
        })
    } catch {
        onFailure({ errors: ['Request Timeout'], code: 408 })
    }
    
}

export const postResource = async (route, body, onSuccess, onFailure, isFormData) => {  
    setToken()
    if(isFormData)
     {
          headers.delete('Content-type')
     }

    try {
        const response = await timeoutPromise(15000, fetch(route,{headers, body, method: 'post'}))
        await handleResponse(response, (data) => {
            onSuccess(data)
        }, (error) => {
            onFailure(error)
        })
    }
    catch(e) {
        onFailure({ errors: ['Request Timeout'], code: 408 })
    }
}

export const patchResource = async (route, body, onSuccess, onFailure) => {  
    setToken()
    try {
        const response = await timeoutPromise(15000,fetch(route,{headers, body, method: 'patch'}))
        await handleResponse(response, (data) => {
            onSuccess(data)
        }, (error) => {
            onFailure(error)
        })
    } catch {
        onFailure({ errors: ['Request Timeout'], code: 408 })
    }
}

export const deleteResource = async (route, onSuccess, onFailure) => {  
    setToken()
    try {
        const response = await timeoutPromise(15000, fetch(route,{headers, method: 'delete'}))
        await handleResponse(response, (data) => {
            onSuccess(data)
        }, (error) => {
            onFailure(error)
        })
    } catch {
        onFailure({ errors: ['Request Timeout'], code: 408 })
    }
}