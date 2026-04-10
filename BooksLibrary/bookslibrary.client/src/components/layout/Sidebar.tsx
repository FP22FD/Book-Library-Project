'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PiHouseLight } from 'react-icons/pi';
import { PiInfoLight } from 'react-icons/pi';
import { PiEnvelopeLight } from 'react-icons/pi';

export default function Sidebar() {
  const currentPath = usePathname();
  console.log(currentPath);

  return (
    <aside className="flex flex-col flex-shrink-0 border-r bg-light-bg1 p-4 overflow-auto transition-colors duration-300">
      <div>
        <div className="mb-4 font-bold text-[10px] uppercase tracking-[1.5px] text-light-text2">
          Dashboard
        </div>
      </div>

      <nav>
        <ul className="space-y-1">
          <li>
            <Link
              href="/"
              className={[
                'flex items-center gap-3 px-3 py-1 rounded-lg text-base transition-colors hover:bg-light-bg3',
                currentPath === '/'
                  ? 'bg-light-bgActive text-light-bg1 font-bold hover:text-light-bg1 hover:bg-light-bgActive'
                  : 'bg-light-bg1 text-light-text1',
              ].join(' ')}
            >
              <PiHouseLight size={20} aria-label="Home" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={[
                'flex items-center gap-3 px-3 py-1 rounded-lg text-base transition-colors hover:bg-light-bg3',
                currentPath === '/about'
                  ? 'bg-light-bgActive text-light-bg1 font-bold hover:text-light-bg1 hover:bg-light-bgActive'
                  : 'bg-light-bg1 text-light-text1',
              ].join(' ')}
            >
              <PiInfoLight size={20} aria-label="About" />
              <span>About</span>
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={[
                'flex items-center gap-3 px-3 py-1 rounded-lg text-base transition-colors hover:bg-light-bg3',
                currentPath === '/contact'
                  ? 'bg-light-bgActive text-light-bg1 font-bold hover:text-light-bg1 hover:bg-light-bgActive'
                  : 'bg-light-bg1 text-light-text1',
              ].join(' ')}
            >
              <PiEnvelopeLight size={20} aria-label="Contact" />
              <span>Contact</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
