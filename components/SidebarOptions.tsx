"use client";

import { db } from '@/firebase';
import { doc, DocumentData } from 'firebase/firestore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore';


const SidebarOptions = ({id,href}:{
    id: string,
    href: string
}) => {
    const [data,loading,error] = useDocumentData(doc(db,"documents",id));
    const pathname = usePathname();
    const isActive = href.includes(pathname) && pathname !== '/';
    
    if(!data) return null;
  return (
    <div>
      <Link href={href} className={`whitespace-nowrap border p-2 rounded-md ${isActive ? "bg-gray-300 font-bold border-black" : "border-gray-400"}`}>
        {data?.title}
      </Link>
    </div>
  )
}

export default SidebarOptions
