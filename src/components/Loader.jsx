import React from 'react'

function Loader() {
  return (
    <div className='h-screen grid place-items-center'>
      <div className='w-14 aspect-square border-b-2 border-b-white rounded-full animate-spin'></div>
    </div>
  )
}

export default Loader