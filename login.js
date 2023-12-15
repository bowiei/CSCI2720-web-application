import React from 'react';
import ReactDOM from 'react-dom';

const styles = {
  loginPage: {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    fontFamily: 'Poppins, sans-serif',
    display: 'grid',
    height: '100%',
    width: '100%',
    placeItems: 'center',
    background: '#f2f2f2',
  },
  loginContainer: {
    width: '380px',
    background: '#fff',
    borderRadius: '15px',
    boxShadow: '0px 15px 20px rgba(0,0,0,0.1)',
  },
  formHeader: {
    fontSize: '35px',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: '100px',
    color: '#fff',
    userSelect: 'none',
    borderRadius: '15px 15px 0 0',
    background: 'linear-gradient(-135deg, #c850c0, #4158d0)',
  },
  form: {
    padding: '10px 30px 50px 30px',
  },
  inputContainer: {
    height: '50px',
    width: '100%',
    marginTop: '20px',
    position: 'relative',
  },
  input: {
    height: '100%',
    width: '100%',
    outline: 'none',
    fontSize: '17px',
    paddingLeft: '20px',
    border: '1px solid lightgrey',
    borderRadius: '25px',
    transition: 'all 0.3s ease',
  },
  label: {
    position: 'absolute',
    top: '50%',
    left: '20px',
    color: '#999999',
    fontWeight: '400',
    fontSize: '17px',
    pointerEvents: 'none',
    transform: 'translateY(-50%)',
    transition: 'all 0.3s ease',
  },
  rememberMeContainer: {
    display: 'flex',
    width: '100%',
    height: '50px',
    fontSize: '16px',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rememberMeLabel: {
    color: '#262626',
    userSelect: 'none',
    paddingLeft: '5px',
  },
  forgotPassword: {
    color: '#262626',
    marginTop: '20px',
    textAlign: 'center',
  },
  submitButtonContainer: {
    height: '50px',
    width: '100%',
    marginTop: '20px',
    position: 'relative',
  },
  submitButton: {
    color: '#fff',
    border: 'none',
    paddingLeft: '0',
    marginTop: '-10px',
    fontSize: '20px',
    fontWeight: '500',
    cursor: 'pointer',
    background: 'linear-gradient(-135deg, #c850c0, #4158d0)',
    transition: 'all 0.3s ease',
  },
  signupMessage: {
    color: '#262626',
    marginTop: '20px',
    textAlign: 'center',
  },
};

const LoginPage = () => {
  return (
    <div style={styles.loginPage}>
      <div style={styles.loginContainer}>
        <div style={styles.formHeader}>Login Form</div>
        <form style={styles.form}>
          <div style={styles.inputContainer}>
            <input type="text" required style={styles.input} />
            <label style={styles.label}>Email Address</label>
          </div>
          <div style={styles.inputContainer}>
            <input type="password" required style={styles.input} />
            <label style={styles.label}>Password</label>
          </div>
          <div style={styles.rememberMeContainer}>
            <div>
              <input type="checkbox" id="remember-me" style={{ width: '15px', height: '15px' }} />
              <label htmlFor="remember-me" style={styles.rememberMeLabel}>
                Remember me
              </label>
            </div>
            <div style={styles.forgotPassword}>
              <a href="#">Forgot password?</a>
            </div>
          </div>
          <div style={styles.submitButtonContainer}>
            <input type="submit" value="Login" style={styles.submitButton} />
          </div>
          <div style={styles.signupMessage}>
            Not a member? <a href="#">Signup now</a>
          </div>
        </form>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#loginPage'));
root.render(<LoginPage />);