"use client";
import React, { useState } from 'react';
import { useLenis } from 'lenis/react';
import { WatchSVG } from '@/app/svg/watch';
export function Preloader(props) {
    const lenis = useLenis(({ scroll }) => {

    });

    const [isScrol, setScroll] = useState(false)
    const clickPreload = () => {
        if (!lenis) return
        if (isScrol) {
            setScroll(false)
            return lenis.stop()
        }
        setScroll(true)
        lenis.start()
    }
    return (
        <div className={`fixed  flex flex-col justify-center items-center inset-0  bg-black/10 pointer-events-none  z-50  ${true ? 'preload' : 'hidden'}`} onClick={clickPreload}>
            <div className='flex-1 flex justify-center items-center'>ASTERIUM</div>
            <div className='flex flex-col justify-center items-center'>
                <WatchSVG />
                <span>Loading</span>
            </div>
            <div className='flex-1'></div>

        </div>
    );
}
