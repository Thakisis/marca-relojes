
import LogoAsterium from "@/components/logo-asterium";
export function HeroIndex({page}) {
    return (

        <header className='grid grid-cols-12 w-full h-screen justify-between  outline-white/50 outline-[1px] -outline-offset-[3.5rem] overCanvas'>
            <div className='col-span-4 h-full grid place-items-center   '>

                <h1 className='flex flex-col justify-center items-center gap-5 text-white text-5xl  font-[200] wittgenstein '>
                    <LogoAsterium className='w-40 h-40 -translate-y-[2px] hidden' aria-hidden='true' />
                    <div className="w-40 h-40 goldbg" style={{ maskImage: "url(/LogoNav.svg)",maskSize:"contain",maskRepeat:"no-repeat", maskPosition:"center" }}>

                    </div>
                    Asterium
                </h1>

            </div>
            <div className='col-start-9 col-span-4  grid place-items-center text-white   h-full'>
                pagina:{page}
            </div>
        </header>

    );
}

