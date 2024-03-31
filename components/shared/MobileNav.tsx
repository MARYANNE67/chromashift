'use client'

import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, UserButton, SignedOut } from '@clerk/nextjs'
import { navLinks } from '@/app/(root)/constants'
import { usePathname } from 'next/navigation'

const MobileNav = () => {
    const pathname = usePathname();

  return (
    <header className='header'>
        <Link href='/' className='flex items-center gap-2 md:py-2'>
            <Image src='/assets/images/logo-text.svg' alt='logo' width={180} height={28}/>
        </Link>
        <nav className='flex gap-3'>
            {/* Logic for when user is signed in  */}
            <SignedIn>
                <UserButton afterSignOutUrl='/'/>
                <Sheet>
                    <SheetTrigger>
                        <Image src="/assets/icons/menu.svg"
                        alt="menu"
                        width={32}
                        height={32}
                        className='cursor-pointer'
                        />
                    </SheetTrigger>
                    <SheetContent className='sheet-content sm:w-64'>
                      <>
                        <Image src='/assets/images/logo-text.svg' alt='logo' width={152} height={23}/>
                        {/* show nav links only when user is signed in */}
                        <ul className='header-nav_elements'>
                        {navLinks.map((link) =>{
                            const ifActive = link.route === pathname

                            return(
                              <li key={link.route} className={`${
                                  ifActive && 'gradient-text'} p-18 flex
                                  whitespace-nowrap text-dark-700}`}>
                                  <Link className="sidebar-link cursor-pointer" href={link.route}>
                                  <Image 
                                      src={link.icon}
                                      alt='logo'
                                      width={24}
                                      height={24}
                                  />
                                  {link.label}
                                  </Link>
                              </li>
                            )})}
    
                        </ul>
                        </>
                    </SheetContent>
                </Sheet>
           </SignedIn>

          <SignedOut>
            <Button asChild className="button bg-purple-gradient bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
         </SignedOut>
        </nav>   
    </header>

  )
}

export default MobileNav;