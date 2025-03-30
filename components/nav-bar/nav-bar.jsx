import LogoAsterium from "@/components/logo-asterium";
import { MainMenu } from "./main-menu";
function Navbar(props) {
    return (
        <div className='absolute inset-x-0 top-0 z-50 flex justify-center items-center outfit z-[150]' >
            <div className='flex justify-between items-center w-[90rem] margin-auto  px-4 py-2'>
                <div className='wittgenstein flex items-center gap-2 h-5 '><LogoAsterium className='w-5 h-5 -translate-y-[2px]' />ASTERIUM</div>
                <MainMenu />
                <div></div>
            </div>
        </div>
    );
}

export default Navbar;