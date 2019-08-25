/* eslint-disable eqeqeq */
import {
    JsonHubProtocol,
    HttpTransportType,
	HubConnectionBuilder,
    LogLevel
  } from '@aspnet/signalr'
  

import { AUTH_LOGIN } from '../../admin/modules/Authintication/store/action-types';
  
var connection = null;

const startSignalRConnection = (connection) => connection.start()
    .then(() => {
		console.info('SignalR Connected')
	})
    .catch(err => {
		console.error('SignalR Connection Error: ', err)
	});
  
const signalRMiddleware = store => next => async (action) => {
    // register signalR after the user logged in
    if (action.type === AUTH_LOGIN) {
    	const connectionHub = '/ServerHub/chatHub';
  
		const protocol = new JsonHubProtocol();
  
		// let transport to fall back to to LongPolling if it needs to
		const transport = HttpTransportType.LongPolling;
  
		const options = {
			transport,
			logMessageContent: true,
			logger: LogLevel.Trace,
		};
  
		// create the connection instance
		connection = new HubConnectionBuilder()
			.withUrl(connectionHub, options)
			.withHubProtocol(protocol)
			.build();
  
		// re-establish the connection if connection dropped
		connection.onclose(() => setTimeout(startSignalRConnection(connection), 5000));
  
		startSignalRConnection(connection);
	}
	
	if(action.type == JOIN_GROUP){
		if(connection.state == 1){
			connection.invoke('JoinGroup', 1)
		}
	}

	if(action.type == SEND_MESSAGE){
		if(connection.state == 1){
			connection.invoke('SendGroupMessage', 1, 'Hello World')
		}
	}

	if(connection){
		connection.on('ReceiveMessage', (res) => {
			console.log(res)
		})
	}
  
    return next(action);
};
  
export default signalRMiddleware;