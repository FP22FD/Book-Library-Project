import Link from 'next/link';

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <div className={`border-b p-4 flex items-center justify-between ${className}`}>
      {/* TODO: Make this logo a separate component and add a dark mode variant */}
      <Link href="/" className="flex gap-3 flex-shrink-0 justify-start">
        {/* Logo */}
        <svg className="w-7 h-7 text-light-text1" viewBox="0 0 28 28">
          <rect x="4" y="3" width="5" height="22" rx="1" className="fill-light-purple" />
          <rect x="10" y="5" width="5" height="20" rx="1" className="fill-light-borderSoft" />
          <rect x="16" y="2" width="5" height="24" rx="1" className="fill-light-gold" />
          <rect x="22" y="6" width="3" height="17" rx="1" className="fill-light-purple" />
        </svg>

        <span className="font-playfair font-bold text-[19px] tracking-[-0.3px] text-[var(--text0)]">
          Book Library
        </span>
      </Link>

      {/* Search */}
      {/* <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 bg-light-bg2 border border-light-border rounded-lg py-[7px] px-4 w-[min(280px,40vw)] cursor-text transition-all duration-200 hover:shadow-sm hover:border-light-borderSoft focus-within:shadow-md focus-within:border-light-tag1t">
                    <input
                        type="text"
                        placeholder="Search books…"
                        className="flex-1 bg-transparent outline-none text-sm transition-colors duration-200"
                        aria-label='Search'
                    />
                    <span className="text-light-tag3t shrink-0 cursor-pointer"><PiMagnifyingGlassLight /></span>
                </div>
            </div> */}

      {/* <div className="flex gap-3 items-center flex-shrink-0">

            
                <div className="flex items-center gap-2 px-4 py-1.5 border border-[rgba(0,0,0,0.14)] rounded-lg cursor-pointer bg-white text-sm text-[rgb(85,85,85)]">
                    <PiCalendarBlankLight className="w-4 h-4 shrink-0" />
                    <span>Jan 2026 - Mar 2026</span>
                </div>

              
                <button
                    type='button'
                    aria-label='Notifications'
                    className="relative flex items-center gap-2 cursor-pointer">

                    <span className='relative inline-grid h-8 w-8 place-items-center'>
                        <PiBellLight className="w-5 h-5 shrink-0 text-[rgb(85,85,85)] absolute" />
                    </span>

                    <span className="absolute -top-0 -right-0 min-w-[1.05rem] h-[1.05rem] px-1 rounded-full bg-light-tag1t text-light-bg1 text-[10px] font-semibold leading-none flex items-center justify-center border border-[rgba(0,0,0,0.14)]">
                        3
                    </span>

                </button>

              
                <div className='w-8 h-8 text-sm bg-light-text0 flex cursor-pointer rounded-2xl text-light-accentSoft items-center justify-center font-semibold'
                >E</div>

            </div> */}
    </div>
  );
}
