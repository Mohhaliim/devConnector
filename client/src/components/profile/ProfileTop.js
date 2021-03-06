import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Email from './Email';

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar, img, email },
  },
}) => {
  const [contact, setContact] = useState({ state: false, reciever: email });
  //const [reciever, setReciever] = useState(email);
  let source;
  if (img) {
    const data = Buffer.from(img.data.data).toString('base64');
    source = `data:${img.contentType};base64,${data}`;
  }
  return (
    <div className='profile-top bg-primary p-2'>
      {img ? (
        <img src={source} alt='' className='round-img my-1' />
      ) : (
        <img src={avatar} alt='' className='round-img my-1' />
      )}

      <h1 className='large'>{name}</h1>
      <p className='lead'>
        {status} {company && <span> at {company} </span>}
      </p>
      <p>{location && <span>{location}</span>}</p>
      <div className='icons my-1'>
        {website && (
          <a href={website} target='_blank' rel='noopener noreferrer'>
            <i className='fas fa-globe fa-2x'></i>
          </a>
        )}
        {social && social.twitter && (
          <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-twitter fa-2x'></i>
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-facebook fa-2x'></i>
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-linkedin fa-2x'></i>
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-youtube fa-2x'></i>
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-instagram fa-2x'></i>
          </a>
        )}
        {
          <a
            onClick={() => {
              setContact({ state: true });
            }}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fas fa-envelope fa-2x'></i>
          </a>
        }
      </div>
      <Email contact={contact} setContact={setContact}></Email>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
