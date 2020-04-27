import React from 'react';
import { Redirect } from 'react-router-dom'

const Navbar = () => {

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div>
      {localStorage.getItem('token') ? <div className="header-container-wrapper">
        <div className="header-container">
          <div className="custom-header-bg">
            <div className="page-center">
              <a href="/" className="logo">DropBox</a>
              <div className="navigation">
                <ul>
                  <li><span className="button open-progress  signOutBtn">Files Uploaded</span></li>
                  <li><span onClick={handleClick} className="button signOutBtn">Sign out</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div> : <Redirect to='/signin' />

      }
    </div>
  );
}

export default Navbar;