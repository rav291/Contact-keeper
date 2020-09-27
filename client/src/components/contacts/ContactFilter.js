import React, { useContext, useRef, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {

    const contactContext = useContext(ContactContext);

    const { filterContacts, clearFilter, filtered } = contactContext;

    // We are using useRef hook here...
    const text = useRef('');

    useEffect(() => {
        if (filtered === null)
            text.current.value = ''; // Not really needed | Dosen't break the app
    }, [ filtered ])

    const onChange = (e) => {
        if (text.current.value !== '') // text is used as a reference variable .. We can also use e.target.value here...
            filterContacts(e.target.value);
        else
            clearFilter(); // Not really needed | Dosen't break the app
    }

    return (
        <form>
            <input ref={text} type="text" placeholder='Search' onChange={onChange} />
        </form>
    )
}

export default ContactFilter;
