import SigninRouts from '../admin/modules/Authintication/routes' 
import Errors from '../admin/modules/Errors/routes'
import TodoList from '../admin/modules/ToDoList/routes'
export default [...TodoList,...SigninRouts,...Errors]