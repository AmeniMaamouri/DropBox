import React, { useEffect, useRef } from 'react';
// import useForm from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../store/actions/authActions';
import { useHistory, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const SignUp = () => {

  // const [values, handleChange] = useForm();
  const message = useSelector(state => state.auth.registerMsg);
  const history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    if (data) {
      //  dispatch(register(data));
    }
  }

  useEffect(() => {
    if (message === 'Account Created Successfully') {
      setTimeout(() => {
        history.push('/signin')
      }, 2000)
    }
    console.log('render')
  }, [message, history])

  return (
    <div>
      {localStorage.getItem('token') ? <Redirect to="/" /> : <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
            <form onSubmit={handleSubmit(onSubmit)} methode='POST' action='/signup' className="login100-form validate-form">
              <span className="login100-form-title p-b-33">
                Register
              </span>
              {message === 'Email already exist' ? <div className='registerResponseFailed'>{message}</div> : <div className='registerResponseSuccess'>{message}</div>}
              <div className="wrap-input100">

                <input className={`input100 ${errors.username} && 'is-invalid d-block`} type="text" name="username" placeholder="Username" ref={register({
                  required: "You must specify a username", minLength: {
                    value: 3,
                    message: "Username must have at least 3 characters"
                  }
                })} />
                <span className="focus-input100-1" />
                <span className="focus-input100-2" />
              </div>
              {errors.username && <div className="invalid-feedback d-block">
                {errors.username.message}
              </div>}
              <div className="wrap-input100 rs1 validate-input" data-validate="Password is required">
                <input className="input100" type="text" name="email" placeholder="Email" ref={register({
                  required: "You must specify email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address"
                  }
                })} />
                <span className="focus-input100-1" />
                <span className="focus-input100-2" />
              </div>
              {errors.email && <div className="invalid-feedback d-block">
                {errors.email.message}
              </div>}

              <div className="wrap-input100 rs1 validate-input" data-validate="Password is required">
                <input className="input100" type="password" name="password" placeholder="Password" ref={register({
                  required: "You must specify a password",
                  minLength: {
                    value: 5,
                    message: "Password must have at least 5 characters"
                  }
                })} />
                <span className="focus-input100-1" />
                <span className="focus-input100-2" />
              </div>
              {errors.password && <div className="invalid-feedback d-block">
                {errors.password.message}
              </div>}
              <div className="wrap-input100 rs1 validate-input" data-validate="Password is required">
                <input className="input100" type="password" name="confirmPassword" placeholder="Confirm Password"
                  ref={register({
                    required: "You must specify a username",
                    validate: value =>
                      value === password.current || "The passwords do not match"
                  })}
                />
                <span className="focus-input100-1" />
                <span className="focus-input100-2" />
              </div>
              {errors.confirmPassword && <div className="invalid-feedback d-block">
                {errors.confirmPassword.message}
              </div>}
              <div className="container-login100-form-btn m-t-20">
                <button type="submit" className="login100-form-btn btnsend">
                  Sign Up
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
                  Do you have account?
                </span>
                <a className="aBalise" href="/signin">
                  Sign In
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

export default SignUp;