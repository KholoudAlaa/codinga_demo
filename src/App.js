import React, { Component } from 'react';
import { Provider } from 'react-redux'
import './App.css';
import './styelSheets/css/style.css'
import store from './store'
import Routes from './routes/index'
import { setLocale } from './admin/modules/Common/store/actions'
import { authCheck} from './admin/modules/Authintication/store/actions';

store.dispatch(authCheck())
store.dispatch(setLocale(localStorage.getItem('currentLocale') === null ? localStorage.getItem('currentLocale') : 'english'))


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes/>
      </Provider>
    );
  }

}

export default App;
