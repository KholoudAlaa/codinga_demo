# Foundation Components - React Component

## Install

    $ git clone https://starwalletlabs.visualstudio.com/Foundation%20Components/_git/ReactComponet
    $ cd ReactComponent
    $ npm install

## Start & watch

    $ npm start

## Build for production

    $ npm run build

# Functionality 

## 1. Routing

#### Routes Paramters
| Parameter  | Type  | Description  | Example |
|---|---|---|---|
| path  | string  | defines route path  | `'path/to/component'`  |
| isAuth  | boolean  | defines whether this route requires authentication or not  | `true | false`  |
| component  | React Component  | loads a the component that should be rendered  | `component: Loadable({  loader: () => import('/path/to/component'), loading: () => (<h1>Loading component here</h1>) })`  |
| ...props  | -  | the rest of react-router-dom route parameters, see [react-router-dom route](https://reacttraining.com/react-router/web/api/Route)  | `exact: true`  |


## Helper commands
#### Create new module
    $ createModule <module_name> <parent_directory>
#### Create new component 
    $ createComponent <component_name> <module_name> <parent_directory>
    
###### Note: you need to run `$ source .bash_profile` command to enable using helper commands