import React from 'react'

export default function Header() {
  return (
    <header className='flex items-center
        justify-between gap-4 p-4'>
          <h1 className='font-medium'>PDF<span className='text-blue-400 bold'> Similarity</span></h1>
          <button className='flex items-center 
          gap-2 specialBtn px-3 rounded-lg
          text-blue-400'>
            <i class="fa-solid fa-plus"></i>
          </button>
        </header>
  )
}
