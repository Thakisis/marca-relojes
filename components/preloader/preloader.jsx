"use client";
import React, { useState } from 'react';
import { useLenis } from 'lenis/react';
import { WatchSVG } from '@/app/svg/watch';
import useAsteriumStore from '@/store';
export function Preloader(props) {
    const lenis = useLenis(({ scroll }) => {

    });
    const isComplete = useAsteriumStore((state) => state.preloading.isComplete)
    console.log(isComplete)
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
        <div className={`fixed  flex flex-col justify-center items-center inset-0  bg-red-500/10 transition-[1s]  z-50  ${isComplete ? 'opacity-50' : 'opacity-100'}`} onClick={clickPreload}>
            <div className='flex-1 flex justify-center items-center'>ASTERIUM</div>
            <div className='flex flex-col justify-center items-center'>
                <WatchSVG />
                <span>Loading</span>
            </div>
            <div className='flex-1'></div>

        </div>
    );
}
