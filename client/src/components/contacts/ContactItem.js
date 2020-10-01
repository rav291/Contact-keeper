import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import ContactContext from '../../context/contact/contactContext'


const ContactItem = ({ contact }) => {

    const contactContext = useContext(ContactContext);

    const { _id, name, email, phone, type } = contact;
    const { deleteContact, setCurrent, clearCurrent } = contactContext;

    const onDelete = () => {
        deleteContact(_id);
        clearCurrent();
    }

    const onEdit = () => {
        setCurrent(contact);
    }

    return (
        <div className='card bg-light'>
            <h3 className='text-dark text-left'>
                {name}{' '}<span style={{ float: 'right' }} className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}</span>

                <ul className='list'>
                    {email && (
                        <li>
                            <i className="fab fa-mailchimp"></i>  {email}
                        </li>
                    )}
                    {phone && (
                        <li>
                            <i className="fas fa-mobile-alt"></i>  {phone}
                        </li>
                    )}
                    <p>
                        <button className="btn btn-success btn-sm" onClick={onEdit} >Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={onDelete} >Delete</button>

                    </p>
                </ul>
            </h3>
        </div>
    )
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired,
}

export default ContactItem;
