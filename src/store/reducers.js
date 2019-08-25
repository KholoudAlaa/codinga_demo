import { combineReducers } from 'redux'
import auth from '../admin/modules/Authintication/store/reducer'
import common from '../admin/modules/Common/store/reducer'

export default combineReducers({ auth, common })
