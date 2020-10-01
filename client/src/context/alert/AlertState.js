import React, { useReducer } from 'react';
import AlertContext from './alertContext'
import alertReducer from './alertReducer'
import * as uuid from 'uuid';

import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types'

const AlertState = props => {
    const initialState = []
    const [state, dispatch] = useReducer(alertReducer, initialState);

    // Set alert
    const setAlert = (msg, type) => {

        const id = uuid.v4();
        dispatch(
            {
                type: SET_ALERT,
                payload: { msg, type, id }
            }
        );

        setTimeout(() => {
            dispatch({
                type: REMOVE_ALERT,
                payload: id
            })
        }, 5000)
    }
    // Remove alert

    return (
        <AlertContext.Provider
            value={
                {
                    alerts : state,
                    setAlert
                }
            }>

            {props.children}

        </AlertContext.Provider>
    );
};

export default AlertState;
