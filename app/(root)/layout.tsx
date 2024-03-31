import MobileNav from '@/components/shared/MobileNav';
import Sidebar from '@/components/shared/SideBar';
import React from 'react'


 const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <main className='root'>
      <Sidebar/>
      <MobileNav/>

        <div className='root-container'>
             <div className='wrapper'>
              {children}    {/*display route group children info*/}
            </div>
        </div>

    </main>
  )
}
export default Layout;