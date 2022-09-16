import './photo-of-the-day.css';
import React from 'react';
import AdminCustomPictureInput from '../AdminCustomPictureInput/AdminCustomPictureInput';

const PhotoOfTheDay = (props) => {

    return (
        <div className='admin-photo-of-the-day'>
               <div className='breakdown-header admin-breakdown-header'>
                      <hr />
                      <div className='breakdown-header__text'>
                          <p>PHOTO OF THE DAY</p>
                      </div>
                  </div>
                  <AdminCustomPictureInput/>
        </div>
    );
};

export default PhotoOfTheDay;