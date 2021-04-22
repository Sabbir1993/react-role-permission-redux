# Getting Started with React Role Permission

### Configuration
    To use this package just need to go through 2 step  
> import store from 'react-role-permission'
```js
import { store } from 'react-role-permission'
```

> import all relevant hooks from 'react-role-permission'
```js
import { mainReducer, store,SET_PERMISSIONS, SET_ROLES, UN_AUTH_PATH, RouteGuard, HasRole, HasPermission} from 'react-role-permission'
```

## Uses

    Set roles, permission and unauthorize path
    
```js
useEffect(() => {
        store.dispatch(SET_ROLES(['guest']))
        store.dispatch(SET_PERMISSIONS(['dashboard','login']))
        store.dispatch(UN_AUTH_PATH('/'))
    },[])
``` 

>Use in component 
    
    check role 
```js
    {
        HasRole('admin')?
            'admin ':
            'not admin '
    }
```
    check permission 
```js
    {
        HasPermission('dashboard')?
            'dashboard ':
            'not dashboard '
    }
```

>Use in route 

    Use in route to chek permission
    
```js
<RouteGuard exact path="/dashboard" can={'dashboards'} Route={Route} component={Dashboard}/>
```

    Use in route to chek role
    
```js
<RouteGuard exact path="/login" ability={'guest'} Route={Route} component={Login} />
```

### example 
>index.js
```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { store } from 'react-role-permission'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
```

>app.js
```js
import React, {useEffect} from "react";
import { mainReducer, store,SET_PERMISSIONS, SET_ROLES, UN_AUTH_PATH, RouteGuard, HasRole, HasPermission} from 'react-role-permission'
import {BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Default from "./Components/Default";
import {connect} from 'react-redux'

function App(props) {
    useEffect(() => {
        store.dispatch(SET_ROLES(['guest']))
        store.dispatch(SET_PERMISSIONS(['dashboard','login']))
        store.dispatch(UN_AUTH_PATH('/'))
    },[])
    return (
        <div className="App">
            {
                HasRole('admin')?
                    'admin ':
                    'not admin '
            }
            <br/>
            {
                HasPermission('dashboard')?
                    'dashboard ':
                    'not dashboard '
            }
            <br/>
            <BrowserRouter>
                <Switch>
                    <RouteGuard exact path="/dashboard" can={'dashboards'} Route={Route} component={Dashboard}/>
                    <RouteGuard exact path="/login" ability={'guest'} Route={Route} component={Login} />
                    <RouteGuard path="*" Route = {Route} component={Default}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

const mapStateToProps = (state) => ({
    roles: state.roles,
    permissions: state.permissions,
    unAuthorizationPath: state.unAuthorizationPath,
});

export default connect(mapStateToProps, { mainReducer })(App);
```
