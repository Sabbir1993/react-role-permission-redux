import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import { Redirect  } from 'react-router-dom'

export const SET_PERMISSIONS = (data) => ({
    type: 'SET_PERMISSIONS',
    payload: data
});

export const SET_ROLES = (data) => ({
    type: 'SET_ROLES',
    payload: data
});

export const UN_AUTH_PATH = (data) => ({
    type: 'UN_AUTH_PATH',
    payload: data
});

const initialState = {
    roles: [],
    permissions: [],
    unAuthorizationPath: '/'
}

export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ROLES':
            return {
                ...state,
                roles: action.payload
            };
        case 'SET_PERMISSIONS':
            return {
                ...state,
                permissions: action.payload
            };
        case 'UN_AUTH_PATH':
            return {
                ...state,
                unAuthorizationPath: action.payload
            };
        default:
            return state;
    }
}

export const store = createStore(mainReducer,applyMiddleware(thunk));

export const RouteGuard = (props) => {
    const state = store.getState()
    const {permissions, roles, unAuthorizationPath} = state
    const checkPermission = () => {
        if(props.can){
            if(permissions.includes(props.can)){
                return true
            } else {
                return false
            }
        } else if(props.ability) {
            if(roles.includes(props.ability)){
                return true
            } else {
                return false
            }
        }else {
            return true
        }
    }


    return (
        checkPermission() ?
            <props.Route {...props}/>
            :
            // <Redirect to={unAuthorizationPath} />
            window.location.href = unAuthorizationPath
    )
}

export const HasRole = (role) => {
    const state = store.getState()
    const {roles} = state
    if(roles.includes(role)){
        return true
    } else {
        return false
    }
}

export const HasPermission = (permission) => {
    const state = store.getState()
    const { permissions } = state
    if(permissions.includes(permission)){
        return true
    } else {
        return false
    }
}
