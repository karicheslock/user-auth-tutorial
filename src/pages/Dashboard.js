import {Link} from 'react-router-dom';

function Dashboard() {

    return (
      <div className='container flex flex-col justify-center items-center h-screen bg-gray-50'>
        <div className='flex flex-col items-center bg-white p-4 border-2 border-blue-400 rounded mb-4'>
          <p className='font-bold text-3xl text-blue-600 mb-4'>Welcome to the Dashboard!</p>
          <p className='border-2 border-gray-400 rounded px-4 py-2 mb-4 w-2/3 text-center'>Click <Link to='/signup' target="_blank" rel="noreferrer" className='text-blue-600 font-bold hover:text-purple-800'>here</Link> to signup</p>
          <p className='border-2 border-gray-400 rounded px-4 py-2 mb-4 w-2/3 text-center'>Click <Link to='/login' target="_blank" rel="noreferrer" className='text-blue-600 font-bold hover:text-purple-800'>here</Link> to login</p>
          <div className='flex flex-col w-full items-center justify-center'>
            <p className='border-2 border-gray-400 rounded px-4 py-2 mb-4 w-2/3 text-center'>Click <Link to='/reset-password' target="_blank" rel="noreferrer" className='text-blue-600 font-bold hover:text-purple-800'>here</Link> to reset your password</p>
            <p className='text-xs'>*You must have an account before you can reset your password.</p>
          </div>
        </div>
      </div>
    )
  }
  
  export default Dashboard;