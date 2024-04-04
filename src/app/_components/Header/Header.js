import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <div>
            <div className='max-w-[1150px] m-auto w-full flex justify-between px-[15px] max-sm:px-[10px] py-[15px] '>
                <div className=' '>
                    <img src='/NodeDa.png' alt='' className=' w-[160px] max-md:w-[140px] max-sm:w-[140px]  h-[100%]   bg-cover object-cover' />
                </div>
                
                <div className=' cursor-pointer '>
                    <Link href="/signup" className='px-5 max-sm:px-2 py-2.5 text-center   text-md max-sm:text-sm font-medium'>Sign up</Link>
                    <Link href="/signin" className='px-5 max-sm:px-3 py-2.5 max-sm:py-1 text-center bg-[#0076BA] hover:bg-[#3d97cb] rounded-full text-white text-md max-sm:text-sm font-medium'>Sign in</Link>

                </div>
            </div>
        </div>
    )
}

export default Header