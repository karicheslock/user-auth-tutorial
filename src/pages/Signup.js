import { useState } from 'react';
import {auth, provider} from '../firebase-config';
import {signInWithPopup} from 'firebase/auth';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { addDoc, collection, query, getDocs, where} from 'firebase/firestore';
import { db } from '../firebase-config';
import { passwordStrength } from 'check-password-strength';
import { doesUsernameExist, doesEmailExist } from '../services/firebase-services';


function SignUp() {

    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState(''); 
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

    const navigate = useNavigate();
    
    isAuth;

    const isEmailInvalid = email !== confirmEmail;
    const isPasswordInvalid = password !== confirmPassword;
    const isPasswordWeak = passwordStrength(password).value !== 'Strong';
    const isInvalid = username === '' || fullName === '' || email === '' || password === '' || isEmailInvalid || isPasswordInvalid || isPasswordWeak;
        
    const signInWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, provider);
            const user = res.user;
            const userCollectionRef = collection(db, "users");
            const q = query(userCollectionRef, where("uid", "==", user.uid));
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                await addDoc(userCollectionRef, {userId: user.uid, fullName: user.displayName, username: user.displayName.toLowerCase().replace(/\s/g, ''), emailAddress: user.email, authProvider: "google", following: [], followers: [], dateCreated: Date.now()});
            }
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate('/');
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };
    
    const handleFullNameChange = event => {
        setFullName(event.target.value);
    };

    const handleUsernameChange = event => {
        setUsername(event.target.value.toLowerCase().trim());
    };

    const handleEmailChange = event => {
        setEmail(event.target.value.toLowerCase().trim());
    };

    const handleConfirmEmailChange = event => {
        setConfirmEmail(event.target.value.toLowerCase().trim());
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = event => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        
        const userCollectionRef = collection(db, "users");
        const usernameExists = doesUsernameExist(username);
        const emailExists = doesEmailExist(email);

        if(!(await usernameExists).length && !(await emailExists).length) {
            try {
                const createdUserResult = await createUserWithEmailAndPassword(auth, email, password);

                await updateProfile(auth.currentUser, {
                    displayName: username
                });

                await addDoc(userCollectionRef, {userId: createdUserResult.user.uid, fullName: fullName, username: username.toLowerCase(), emailAddress: email, authProvider: "local", following: [], followers: [], dateCreated: Date.now()});

                navigate('/');
                setIsAuth(true);
                localStorage.setItem("isAuth", true);
            } catch(error) {
                setFullName('');
                setUsername('');
                setEmail('');
                setConfirmEmail('');
                setPassword('');
                setConfirmPassword('');
                setError(error.message);
            }
        } else if ((await usernameExists).length) {
            setFullName('');
            setUsername('');
            setEmail('');
            setConfirmEmail('');
            setPassword('');
            setConfirmPassword('');
            setError('That username is already taken, please try a different one');
        } else if ((await emailExists).length) {
            setFullName('');
            setUsername('');
            setEmail('');
            setConfirmEmail('');
            setPassword('');
            setConfirmPassword('');
            setError('An account associated with that email address already exists, please login instead');
        }
    };

    return (
        <div className='bg-gray-50'>
            <div className='container flex mx-auto max-w-xs items-center h-screen'>
                <div className='flex flex-col'>
                    <div className='flex flex-col items-center bg-white p-4 border-2 border-blue-400 rounded mb-4'>

                        <button className="login-with-google-btn mb-4" onClick={ signInWithGoogle }>Sign in with Google</button>

                        {error && <p className='mb-4 text-xs text-red-500 text-center'>{error}</p>}

                        <form onSubmit={handleSubmit} method='POST'>
                            <input 
                                aria-label='Enter your full name'
                                className='text-sm w-full mr-3 py-5 px-4 h-2 border-2 border-blue-800 rounded mb-2'
                                type='text'
                                name='fullName'
                                placeholder='Full Name'
                                onChange={handleFullNameChange}
                                value={fullName}
                            />
                            <input 
                                aria-label='Enter your username'
                                className='text-sm w-full mr-3 py-5 px-4 h-2 border-2 border-blue-800 rounded mb-2'
                                type='text'
                                name='username'
                                placeholder='Username'
                                onChange={handleUsernameChange}
                                value={username}
                            />

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
                                aria-label='Confirm your email address'
                                className='text-sm w-full mr-3 py-5 px-4 h-2 border-2 border-blue-800 rounded mb-2'
                                type='email'
                                name='email'
                                placeholder='Confirm Email Address'
                                onChange={handleConfirmEmailChange}
                                value={confirmEmail}
                            />

                            {isEmailInvalid &&  <p className='text-xs text-red-500'>Email addresses don&apos;t match</p>}

                            <input 
                                aria-label='Enter your password'
                                className='text-sm w-full mr-3 py-5 px-4 h-2 border-2 border-blue-800 rounded mb-2'
                                type='password'
                                name='password'
                                placeholder='Password'
                                onChange={handlePasswordChange}
                                value={password}
                            />
                            <input 
                                aria-label='Confirm your password'
                                className='text-sm w-full mr-3 py-5 px-4 h-2 border-2 border-blue-800 rounded mb-2'
                                type='password'
                                name='password'
                                placeholder='Confirm Password'
                                onChange={handleConfirmPasswordChange}
                                value={confirmPassword}
                            />

                            {isPasswordWeak && password !=='' && <p className='text-xs text-red-500'>Need a strong password</p>}
                            {isPasswordInvalid &&  <p className='text-xs text-red-500'>Passwords don&apos;t match</p>}

                            <button
                                type='submit'
                                className={`bg-blue-400 text-white w-full rounded h-8 font-bold ${isInvalid && 'cursor-not-allowed opacity-50'}`}
                            >
                                Sign Up
                            </button>
                        </form>
                    </div>
                    <div className='flex justify-center items-center flex-col w-full bg-white p-4 border-2 border-blue-400 rounded'>
                        <p className='text-sm'>Already have an account? <Link to='/login' className='font-bold text-blue-400 hover:text-blue-800'>Log in</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SignUp;