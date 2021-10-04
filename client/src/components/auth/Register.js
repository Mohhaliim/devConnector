import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';
import ReactAvatarEditor from 'react-avatar-editor';

export const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  //profile picture beginning
  const [profilePicture, setImageData] = useState({
    imgSource: '',
    allowZoomOut: false,
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    rotate: 0,
    borderRadius: 50,
    preview: null,
    width: 200,
    height: 200,
  });
  const handleNewImage = (e) => {
    setImageData({
      ...profilePicture,
      [e.target.name]: e.target.files[0],
    });
  };
  const handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    setImageData({ ...profilePicture, [e.target.name]: scale });
  };
  const handlePositionChange = (position) => {
    setImageData({ ...profilePicture, position: this.position });
  };
  const setEditorRef = (editor) => (this.editor = editor);
  //profile picture ending

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (profilePicture.imgSource) {
      if (this.editor) {
        const canvas = this.editor.getImageScaledToCanvas();
        const img = await new Promise((resolve) => canvas.toBlob(resolve));
        if (password !== password2) {
          setAlert('password do not match', 'danger');
        } else {
          register({ name, email, password, img });
        }
      }
    } else {
      if (password !== password2) {
        setAlert('password do not match', 'danger');
      } else {
        register({ name, email, password });
      }
    }
  };

  //redirect if loged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <div>
            <ReactAvatarEditor
              ref={setEditorRef}
              image={profilePicture.imgSource}
              scale={parseFloat(profilePicture.scale)}
              width={profilePicture.width}
              height={profilePicture.height}
              position={profilePicture.position}
              onPositionChange={handlePositionChange}
              rotate={parseFloat(profilePicture.rotate)}
              borderRadius={
                profilePicture.width / (100 / profilePicture.borderRadius)
              }
              className='editor-canvas'
            />
          </div>
          Profile Picture:
          <input
            name='imgSource'
            type='file'
            onChange={(e) => handleNewImage(e)}
          />
          <br />
          Zoom:
          <input
            name='scale'
            type='range'
            onChange={handleScale}
            min={profilePicture.allowZoomOut ? '0.1' : '1'}
            max='2'
            step='0.01'
            defaultValue='1'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
