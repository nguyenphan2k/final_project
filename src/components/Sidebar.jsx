import React from 'react'
import { FcBullish } from 'react-icons/fc'
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../ultis/navigation'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineLogout } from 'react-icons/ai'

const linkClass = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base text-white transition duration-200'
export default function Sidebar({handleDelete}) {
     return (
          <div className='flex flex-col bg-neutral-900 w-60 p-3 text-white cursor-pointer'>
               <div className='flex items-center gap-2 px-1 py-3'>
                    <FcBullish />
                    <span className='text-neutral-100 text-lg'>CRUD</span>
               </div>
               <div className='flex-1 py-8 flex flex-col gap-0.5'>
                    {DASHBOARD_SIDEBAR_LINKS.map((item) => (
                         <SidebarLink key={item.key} item={item} />
                    ))}
               </div>
               <div className='flex flex-col gap-0.5 pt-2 border-t border-neutral-700'>
                    {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
                         <SidebarLink key={item.key} item={item} />
                    ))}
                    <div onClick={handleDelete} className={`${linkClass} text-red-600`}>
                         <span className='text-xl'>
                              <AiOutlineLogout />
                         </span>
                         LOGOUT
                    </div>
               </div>
          </div>
     )
}
function SidebarLink({ item }) {
     const { pathname } = useLocation()
     return (
          <Link to={item.path} className={`${pathname === item.path
               ? "text-orange-400" : '', linkClass}`}>
               <span className='text-xl'>{item.icon}</span>
               {item.label}
          </Link>
     )
}

