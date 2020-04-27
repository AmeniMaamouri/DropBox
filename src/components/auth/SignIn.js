import React, { useEffect } from 'react';
import useForm from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/actions/authActions';
import { useHistory } from 'react-router';
import { Redirect } from 'react-router-dom';

const SignIn = () => {

  const [value, handleChange] = useForm();
  const dispatch = useDispatch();
  const message = useSelector(state => state.auth.loginMsg)
  const token = useSelector(state => state.auth.token)
  const history = useHistory();


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(value));
  }

  useEffect(() => {
    if (message === 'Login success') {
      localStorage.setItem('token', token)
      history.push('/');
    }
  }, [message, history, token])

  return (
    <div>
      {localStorage.getItem('token') ? <Redirect to="/" /> : <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
            <form onSubmit={handleSubmit} method='POST' action="/signin" className="login100-form validate-form">
              <span className="login100-form-title p-b-33">
                Account Login
              </span>
              {message !== 'Login success' && <div className="loginResposeErr">{message}</div>}
              <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                <input onChange={handleChange} value={value.email || ''} className="input100" type="text" name="email" placeholder="Email" />
                <span className="focus-input100-1" />
                <span className="focus-input100-2" />
              </div>
              <div className="wrap-input100 rs1 validate-input" data-validate="Password is required">
                <input className="input100" type="password" name="password" onChange={handleChange} value={value.password || ''} placeholder="Password" />
                <span className="focus-input100-1" />
                <span className="focus-input100-2" />
              </div>
              <div className="container-login100-form-btn m-t-20">
                <button type="submit" className="login100-form-btn btnsend">
                  Sign in
                </button>
              </div>
              <div className="text-center p-t-45 p-b-4">
                <span className="txt1">
                  Forgot
                </span>
                <a className="aBalise" href="/signup">
                  Username / Password?
                </a>
              </div>
              <div className="text-center">
                <span className="txt1">
                  Create an account?
                </span>
                <a className="aBalise" href="/signup">
                  Sign up
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      }
    </div>
  );
}

export default SignIn;