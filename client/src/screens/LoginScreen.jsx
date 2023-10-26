import '../../src/assets/css/login.css';
import React, {useContext, useState} from 'react';
import { AuthContext } from '../components/AuthProvider';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import Stylesheet from "reactjs-stylesheet";
import { useNavigate } from 'react-router-dom';

export default function LoginScreen() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {login} = useContext(AuthContext);
  const navigate = useNavigate();

  async function handlePasswordReset() {
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        if (email.includes('@') && email.includes('.com')) {
          alert("Your password reset has been sent to your email")
        }
        else{
          alert("Please enter a valid email.")
        }
      })
      .catch(e => {
        if (e.code === 'auth/invalid-email'){
          alert("Please enter a valid email.")
        }
      })
  }

  return (
    <div className='flex flex-col items-center' id='login-form'>
      <h1 className='text-center text-3xl my-8' style={{fontFamily: "'Monoton', cursive'"}}>Login</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        login(email, password);
      }}
        className='flex flex-col justify-between w-64'
      >
        <input style={styles.input} type="email" name="email" id="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input style={styles.input} type="password" name="password" id="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button style={styles.buttons} type="submit">Sign In</button>
      </form>
      <button style={Object.assign({}, styles.buttons, {backgroundColor: 'crimson'})} onClick={() => handlePasswordReset()}>Forgot Password?</button>
      <button style={Object.assign({}, styles.buttons, {backgroundColor: 'green'})} onClick={() => navigate('/signup')}>Don't have an account? Sign Up</button>
    </div>
  );
}

const styles = Stylesheet.create({
  input: {
    borderRadius:'0.5rem',
    height: '2rem',
    marginBlock: '0.5rem',
  },

  buttons: {
    textAlign: 'center',
    borderRadius: '4px',
    padding: '0.5rem 0.5rem',
    backgroundColor: '#cca353',
    color: '#ffffff',
    fontWeight: 600,
    marginBlock: '0.5rem',
    marginBottom: '1rem',
    paddingInline: '1rem',
  },
});