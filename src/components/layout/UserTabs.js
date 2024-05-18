"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function UserTabs ({isAdmin}) {
    const path = usePathname();
    console.log(path)
    return (
      <div className="flex mx-auto gap-2 tabs justify-center flex-wrap">
        <Link  
         href={'/profile'}
         className={path === '/profile' ? 'active':''} 
        >
            Profile
        </Link>
        {isAdmin && (
          <>
            <Link 
             href={'/categories'}
             className={path === '/categories' ? 'active':''} 
            >
              Categories
            </Link>
            <Link 
              href={'/menu-items'}
              className={path.includes('menu-items') ? 'active':''} 
            >
                Menu Items
            </Link>
            <Link 
             className={path.includes('/users') ? 'active' : ''} 
             href={'/users'}
            >
                Users
            </Link>
          </>
        )}
        <Link 
             href={'/orders'}
             className={path === '/orders' ? 'active':''} 
        >
                Orders
        </Link>
      </div>
    );
}
