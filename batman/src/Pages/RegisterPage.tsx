import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { ChevronRightIcon } from '../Assets/Icons/Icons';
import { ButtonPrimary } from '../Components/Button';
import { DarkInput } from '../Components/Input';
import { Register } from '../Redux/Actions/Creators/user.actions';

const RegisterPage: React.FC = () => {
  // Form
  const [heading, setHeading] = useState<string>(
    "Let's setup your account! 😃"
  );
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const dispatch = useDispatch();

  const { loading, errors, userInfo } = useSelector(
    (state: any) => state.userRegister
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      name,
      username,
      password,
    };

    if (password === confirmPassword) {
      dispatch(Register(data));
    } else {
      setHeading("Passwords don't match! 🙂");
    }
  };

  // If User => Logged In => Redirect
  if (localStorage.getItem('UserInfo') || userInfo) {
    return <Redirect to='/' />;
  }

  return (
    <div
      className='flex flex-col justify-center items-center min-h-screen bg-dark-400 text-white'
      onSubmit={handleSubmit}
    >
      <form className='sm:w-11/12 xl:w-2/4 w-1/3 transform -translate-y-5'>
        <div>
          {loading ? (
            <h1 className='text-5xl font-bold'>Loading...</h1>
          ) : errors ? (
            <h1 className='text-5xl font-bold'>
              {typeof errors === 'string' ? errors : errors[0]}
            </h1>
          ) : (
            <h1 className='text-5xl font-bold'>{heading}</h1>
          )}
        </div>
        <div className='flex flex-col'>
          <div>
            <div className='my-4'>
              <DarkInput
                className='p-3'
                placeholder='Name'
                type='text'
                spellCheck='false'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className='my-4'>
              <DarkInput
                className='p-3'
                placeholder='Username'
                type='text'
                spellCheck='false'
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className='my-4'>
              <DarkInput
                className='p-3'
                placeholder='Password'
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className='my-4'>
              <DarkInput
                className='p-3'
                placeholder='Confirm Password'
                type='password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <ButtonPrimary disabled={loading}>
            Start Chatting
            <ChevronRightIcon />
          </ButtonPrimary>
          <Link
            to='/login'
            className='bg-dark-300 p-3 rounded-md my-2 hover:bg-dark-200 text-center'
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
