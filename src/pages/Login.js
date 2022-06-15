import { useState } from 'react';
import {auth, provider} from '../firebase-config';
import {signInWithPopup, signInWithEmailAndPassword} from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

    const navigate = useNavigate();

    const isInvalid = email === '' || password === '';
    
    const signInWithGoogle = () => {
            signInWithPopup(auth, provider).then((result) => {
            setIsAuth(true);
            localStorage.setItem("isAuth", isAuth);
            navigate('/');
        });
    };
  

    const handleEmailChange = event => {
        setEmail(event.target.value.toLowerCase().trim());
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const handleSubmit = async event => {
      event.preventDefault();

      try {
          await signInWithEmailAndPassword(auth, email, password).then((result) => {
            setIsAuth(true);  
            localStorage.setItem("isAuth", isAuth);
            navigate('/');
          }) 
      } catch (error) {
          setEmail('');
          setPassword('');
          setError(error.message);
      }
  };

  return (
    <div>
      <div className='bg-gray-50'>
            <div className='container flex mx-auto max-w-xs items-center h-screen'>
                <div className='flex flex-col'>
                    <div className='flex flex-col items-center bg-white p-4 border-2 border-blue-400 rounded mb-4'>

                        <button className="login-with-google-btn mb-4" onClick={ signInWithGoogle }>Sign in with Google</button>

                        {error && <p className='mb-4 text-xs text-red-500 text-center'>{error}</p>}

                        <form onSubmit={handleSubmit} method='POST'>
                            <input 
                                aria-label='Enter your email address'
                                className='text-sm w-full mr-3 py-5 px-4 h-2 border-2 border-blue-800 rounded mb-2'
                                type='email'
                                name='email'
                                placeholder='Email Address'
                                onChange={handleEmailChange}
                                value={email}
                            />
                            <input 
                                aria-label='Enter your password'
                                className='text-sm w-full mr-3 py-5 px-4 h-2 border-2 border-blue-800 rounded mb-2'
                                type='password'
                                name='password'
                                placeholder='Password'
                                onChange={handlePasswordChange}
                                value={password}
                            />
                            <button
                                type='submit'
                                className={`bg-blue-400 text-white w-full rounded h-8 font-bold ${isInvalid && 'cursor-not-allowed opacity-50'}`}
                            >
                                Login
                            </button>
                            <p className='text-sm mt-2'>Forgot your password?  Click <Link to='/reset-password' className='font-bold text-blue-400 hover:text-blue-800'>here</Link></p>
                        </form>
                    </div>
                    <div className='flex justify-center items-center flex-col w-full bg-white p-4 border-2 border-blue-400 rounded'>
                        <p className='text-sm'>Need an account? <Link to='/signup' className='font-bold text-blue-400 hover:text-blue-800'>Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login;