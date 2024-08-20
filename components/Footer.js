import React from 'react'

const Footer = () => {
  const currentyear = new Date().getFullYear()
  return (
    <footer className='bg-gray-900 px-2 h-14 items-center text-center text-white flex justify-center'>
      <p> <span className='text-blue-700 mr-3'> copyright &copy; {currentyear} </span> GetMeChai - All rights reserved!</p>
    </footer>
  )
}

export default Footer
