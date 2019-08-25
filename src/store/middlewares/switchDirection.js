import { SET_LOCALE } from "../../admin/modules/Common/store/action-types";

/** NOT USED */
function appendStylesheet(fileName, callback) {

    var styles = document.head.getElementsByTagName('style');
    var head = document.head;
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = fileName;
  
    head.insertBefore(link, styles[0]);

    setTimeout(() => {
        callback()
    }, 150)

}
/** NOT USED */
function removeStylesheet(fileName){
    var stylesheet = document.querySelector(`link[href='${fileName}']`);
    if(stylesheet){
        document.head.removeChild(stylesheet)
    }
}

const switchDirectionMiddleware = store => next => async (action) => {
    
    if(action.type === SET_LOCALE){
        if(action.payload === 'english'){
            document.body.classList.remove('rtl')
        }
        else {
            document.body.classList.add('rtl')
        }
    }
  
    return next(action);
};

export default switchDirectionMiddleware;