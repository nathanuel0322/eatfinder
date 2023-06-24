import React, {useContext, useState} from 'react';
import { AuthContext } from '../components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Stylesheet from 'reactjs-stylesheet';

const SignupScreen = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const {register} = useContext(AuthContext);
  const navigate = useNavigate();

  return(
    <div style={styles.container}>
      <h1 className='text-center text-3xl my-8' style={{fontFamily: "'Monoton', cursive'"}}>Register</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (password === confirmPassword){
          register(email, password, confirmPassword)
            .then(() => navigate('/'))
            .catch(e => {
              if (e.code === 'auth/email-already-in-use'){
                alert("This email is already in use.")
              }
              else if (e.code === 'auth/invalid-email'){
                alert("Please enter a valid email.")
              }
              else if (e.code === 'auth/weak-password'){
                alert("Please enter a stronger password.")
              }
            })
        }
        else {
          alert("Passwords do not match.")
        }
      }}
      style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}
      >
        <input style={styles.input} className='w-64' type="email" name="email" id="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input style={styles.input} type="password" name="password" id="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <input style={styles.input} type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm Password' value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
        />
        <button style={Object.assign({}, styles.buttons, {padding: '0.5rem'})} type="submit">Sign Up</button>
      </form>
      <button style={Object.assign({}, styles.buttons, {backgroundColor: 'navy'})} onClick={() => navigate('/')}>Already have an account? Login</button>
    </div>
  );
};

export default SignupScreen;

const styles = Stylesheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    display: 'flex',
    flexDirection: 'column',
  },

  input: {
    borderRadius:'0.5rem',
    height: '2rem',
    marginBlock: '0.5rem',
  },

  buttons: {
    textAlign: 'center',
    borderRadius: '4px',
    padding: '.72rem 1.7rem',
    backgroundColor: '#cca353',
    color: '#ffffff',
    fontWeight: 600,
    marginBlock: '0.5rem',
  },
});