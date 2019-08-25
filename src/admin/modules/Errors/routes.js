import React from 'react'
import Loadable from 'react-loadable'

const routes = [
    {
        path: '/Error404',
        component: Loadable({
            loader: () => import('./components/Error404/Error404'),
            loading: () => (<h1>Loading component here</h1>)
        })
    }
]

export default routes