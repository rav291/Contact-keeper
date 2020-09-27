import React, { Fragment, useContext } from 'react'
import ContactContext from '../../context/contact/contactContext'
import ContactItem from "./ContactItem";
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const Contacts = () => {

    const contactContext = useContext(ContactContext);

    const { contacts, filtered } = contactContext;

    if (contacts.length === 0)
        return <h4>Please add some contacts...</h4>

    return (
        <Fragment>
            <TransitionGroup>
                {
                    filtered !== null ? filtered.map(contact => ( // cannot use curly braces
                        <CSSTransition key={contact.id} timeout={500} classNames='item'>
                            <ContactItem contact={contact} />
                        </CSSTransition>)) :
                        contacts.map(contact => ( // cannot use curly braces
                            <CSSTransition key={contact.id} timeout={500} classNames='item'>
                                <ContactItem contact={contact} />
                            </CSSTransition>

                        ))}
            </TransitionGroup>
        </Fragment>
    )
}

export default Contacts;
