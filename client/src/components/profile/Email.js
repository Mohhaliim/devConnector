import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendEmail } from '../../actions/profile';

const Email = (props) => {
  const [formData, setFormData] = useState({
    reciever: props.contact.reciever,
    subject: '',
    message: '',
  });

  const { message, subject } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    props.sendEmail(formData);
    props.setContact({ state: false });
  };
  return props.contact.state ? (
    <div className='popup'>
      <div className='popup-inner'>
        <form action='' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group contact'>
            <input
              type='text'
              id='subject'
              name='subject'
              placeholder='subject...'
              value={subject}
              required
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group contact'>
            <textarea
              name='message'
              cols='30'
              rows='5'
              placeholder='Message...'
              value={message}
              onChange={(e) => onChange(e)}
              required
            ></textarea>
          </div>
          <button type='submit' className='btn btn-dark my-1'>
            Send
          </button>
          <button
            className='btn btn-danger my-1'
            onClick={() => props.setContact({ state: false })}
          >
            Go Back
          </button>
          {props.children}
        </form>
      </div>
    </div>
  ) : (
    ''
  );
};

Email.propTypes = {
  sendEmail: PropTypes.func.isRequired,
};

export default connect(null, { sendEmail })(Email);
