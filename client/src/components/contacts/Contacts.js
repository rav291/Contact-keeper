import React, { Fragment, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'
import ContactItem from "./ContactItem";

import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Spinner from '../layout/Spinner'

const Contacts = () => {

    const contactContext = useContext(ContactContext);

    const { contacts, filtered, getContacts, loading } = contactContext;

    useEffect(() => {
        getContacts();
        // eslint-disable-next-line
    }, [])

    if (contacts !== null && contacts.length === 0 && !loading)
        return <h4>Please add some contacts...</h4>

    return (
        <Fragment>
            { contacts !== null && !loading ? (<TransitionGroup>
                {
                    filtered !== null ? filtered.map(contact => ( // cannot use curly braces
                        <CSSTransition key={contact._id} timeout={500} classNames='item'>
                            <ContactItem contact={contact} />
                        </CSSTransition>)) :
                        contacts.map(contact => ( // cannot use curly braces
                            <CSSTransition key={contact._id} timeout={500} classNames='item'>
                                <ContactItem contact={contact} />
                            </CSSTransition>

                        ))}
            </TransitionGroup>) : <Spinner />}

        </Fragment>
    )
}
// _id is used on line 20, 24 bcz mongoDB stores with id name as _id
export default Contacts;
