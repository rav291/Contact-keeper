import React, { useReducer } from 'react';
import * as uuid from 'uuid'; // generates some random id
import ContactContext from "./contactContext";
import contactReducer from './contactReducer';

import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    REMOVE_ALERT,
    SET_ALERT
} from '../types'

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                type: "professional",
                name: "Angela",
                email: "chancellor291@gmail.com",
                phone: "984422393"
            },
            {
                id: 2,
                type: "professional",
                name: "Nicholai",
                email: "reedtz291@gmail.com",
                phone: "7884422393"
            },
            {
                id: 3,
                type: "personal",
                name: "Ravi",
                email: "rav291@gmail.com",
                phone: "8323200302"
            }
        ],
        current: null,
        filtered: null
    }

    const [state, dispatch] = useReducer(contactReducer, initialState); // dispatch allows us to send objects to reducer
    // Cannot use curly braces here

    // Add contact
    const addContact = (contact) => {
        contact.id = uuid.v4();
        dispatch({ type: ADD_CONTACT, payload: contact })
    }

    // Delete contact
    const deleteContact = (name) => {

        dispatch({ type: DELETE_CONTACT, payload: name })
    }

    // Set Current contact
    const setCurrent = (contact) => {

        dispatch({ type: SET_CURRENT, payload: contact })
    }

    // Clear current contact
    const clearCurrent = () => {

        dispatch({ type: CLEAR_CURRENT })
    }

    // Update contact

    const updateContact = (contact) => {

        dispatch({ type: UPDATE_CONTACT, payload: contact })
    }

    // Filter contact

    const filterContacts = (text) => {

        dispatch({ type: FILTER_CONTACTS, payload: text })
    }

    // Clear filter

    const clearFilter = () => {

        dispatch({ type: CLEAR_FILTER })
    }

    return (
        <ContactContext.Provider
            value={
                {
                    contacts: state.contacts,
                    current: state.current,
                    filtered: state.filtered,
                    addContact,
                    deleteContact,
                    setCurrent,
                    clearCurrent,
                    updateContact,
                    filterContacts,
                    clearFilter
                }
            }>

            {props.children}

        </ContactContext.Provider>
    );
};

export default ContactState;