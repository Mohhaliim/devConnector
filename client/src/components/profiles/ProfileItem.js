import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const ProfileItem = ({
  profile: {
    user: { _id, name, avatar, img },
    status,
    company,
    location,
    skills,
  },
}) => {
  let source;
  if (img) {
    const data = Buffer.from(img.data.data).toString('base64');
    source = `data:${img.contentType};base64,${data}`;
  }

  return (
    <div className='profile bg-light'>
      {img ? (
        <img src={source} alt='' className='round-img' />
      ) : (
        <img src={avatar} alt='' className='round-img' />
      )}
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span>at {company}</span>}
        </p>
        <p className='my-1'> {location && <span>{location}</span>} </p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check' /> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
