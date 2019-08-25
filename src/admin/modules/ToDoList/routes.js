import React from 'react'
import Loadable from 'react-loadable'
import { Spin } from 'antd';

/**
 * Defines module routes, you can use react-router-dom route parameters
 * as properties in each object in routes array for example "exact: true"
 * 
 * Each route lazy loads a component if its path matches the current path. 
 */

const routes = [
    {
        path: '/',
        isAuth: true,
        exact: true,
        component: Loadable({
            loader: () => import('./components/ToDoList'),
            loading: () => (<Spin size="small" />)
        })
    },
    {
        path: '/Todolist',
        isAuth: true,
        component: Loadable({
            loader: () => import('./components/ToDoList'),
            loading: () => (<Spin size="small" />)
        })
    }

]

export default routes