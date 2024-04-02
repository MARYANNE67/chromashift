'use client';

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { navLinks } from '@/app/(root)/constants'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className='sidebar'>
      <div className='flex size-full flex-col gap-4'>
        <Link href='/' className='sidebar-logo'>
          <Image src='/assets/images/logo-text.svg' alt='logo' width={180} height={28}/>
        </Link>

        <nav className='sidebar-nav'>
          {/* Logic for when user is signed in  */}
          <SignedIn>
            {/* show nav links only when user is signed in */}
            <ul className='sidebar-nav_elements'>
              {navLinks.slice(0,6).map((link) =>{
                const ifActive = link.route === pathname
                return(
                  <li key={link.route} className={`sidebar-nav_element group ${
                    ifActive ? 'bg-purple-gradient text-white' : 'text-gray-700'
                  }`}>
                    <Link className="sidebar-link" href={link.route}>
                      <Image 
                        src={link.icon}
                        alt='logo'
                        width={24}
                        height={24}
                        className={`${ifActive && 'brightness-200'}`}
                      />
                      {link.label}
                    </Link>
                  </li>
                )})}
               </ul>

               <ul className='sidebar-nav_elements'>
               {navLinks.slice(6).map((link) =>{
                const ifActive = link.route === pathname
                return(
                  <li key={link.route} className={`sidebar-nav_element group ${
                    ifActive ? 'bg-purple-gradient text-white' : 'text-gray-700'
                  }`}>
                    <Link className="sidebar-link" href={link.route}>
                      <Image 
                        src={link.icon}
                        alt='logo'
                        width={24}
                        height={24}
                        className={`${ifActive && 'brightness-200'}`}
                      />
                      {link.label}
                    </Link>
                  </li>
                )})}
                <li className='flex-center cursor-pointer gap-2 p-4'>
                  <UserButton afterSignOutUrl='/' showName/>
                </li>
            </ul>
          </SignedIn>

          {/* Logic for when user is signed out  */}
          <SignedOut>
            <Button asChild className='button bg-purple-gradient bg-cover'>
              <Link href='/sign-in'>Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar