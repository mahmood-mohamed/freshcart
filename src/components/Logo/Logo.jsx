import React from 'react'
import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link 
      to="/" 
      className="font-bold text-2xl cursor-pointer select-none flex items-center"
      aria-label="FreshCart home"
    >
      <i className="fa-solid fa-cart-shopping text-green-500 pe-1" aria-hidden="true"></i>
      Fresh<span className='text-green-500'>Cart</span>
    </Link>
  )
}
