import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import routes from './routes';
import {createBrowserHistory} from 'history'
import {connect} from 'react-redux'
import ReactGA from "react-ga";
import Error404 from '../admin/modules/Errors/components/Error404/Error404';

const history = createBrowserHistory()

history.listen(location => {
	ReactGA.set({ page: location.pathname })
	ReactGA.pageview(location.pathname)
})

/**
 * Detects if user is idle within a specific amout of ms
 * @param {*} ms 
 * @param {*} cb 
 */
function detectIdle(ms, cb) {
    var wait = setTimeout(cb, ms);
    document.onmousemove = document.mousedown = document.mouseup = document.onkeydown = document.onkeyup = document.focus = function (e) {
		clearTimeout(wait);
        wait = setTimeout(cb, ms);

    };
}

/**
 * Returns a public component
 * @param {Object} props 
 */

const PublicRoute = ({ isAuthenticated, component: Component, ...rest, }) => {
	return (<Route {...rest} render={props => (<Component nestedRoutes={rest.nestedRoutes} {...props} />)} />)		

}


/**
 * Returns a private component if user is authenticated and have sufficient permissions
 * @param {Object} props 
 */
const PrivateRoute = ({ component: Component, isAuthenticated, roles, ...rest }) => {
	
	const [isIdle, setIdleState] = useState(false);
	
	useEffect(() => {
		detectIdle(1200000, function () {
			setIdleState(true)
		})
	})
	

	return (
		<Route {...rest} render={props => (
			!isIdle ? (isAuthenticated
				? (
					<Component nestedRoutes={rest.nestedRoutes} path={rest.path} {...props} /> 
				)
				: <Redirect to={{
					pathname: '/signin',
					state: { from: props.location },
				}} />) : <Redirect to={{
					pathname: '/timed-out',
					state: { from:  props.location}
				}}/>
		)} />
		
	)
}

const Routes = ({isAuthenticated,  roles}) => {
	return (
	<Router hisotry={history}>
		<Switch>
			{routes.map((route, i) => {
			if(route.isAuth){
				return (
				<PrivateRoute roles={roles} isAuthenticated={isAuthenticated}  key={i} {...route} />
				)
			}
			return( <PublicRoute isAuthenticated={isAuthenticated} roles={roles} key={i} {...route} />)
			})}
			<Route component={Error404}/>
		</Switch>
	</Router>
)}

function mapStateToProps(state) {
  return {
	isAuthenticated: state.auth.isAuthenticated,
	isMobileVerfied:state.auth.isMobileVerfied,
    roles: state.auth.userRoles
  }
}

export default connect(mapStateToProps)(Routes)
