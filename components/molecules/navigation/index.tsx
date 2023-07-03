import { NavDesktop } from './nav.desktop';
import { NavMobile } from './nav.mobile';

interface Props {}

export function Navigation(props: Props) {
  return (
    <>
      <NavMobile className='flex flex-col md:hidden' />
      <NavDesktop className='hidden md:flex md:items-center md:justify-between md:h-container' />
    </>
  );
}
