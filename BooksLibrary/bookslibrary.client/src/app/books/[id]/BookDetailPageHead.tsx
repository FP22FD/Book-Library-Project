import Link from "next/link";
import { PiArrowLeftLight } from "react-icons/pi";

type Props = {
    className?: string;
};

export default function BookDetailPageHead({ className }: Props) {
    return (
        <div className={`flex flex-col mb-8 pb-8 ${className ?? ''}`}>
            <div>
                <h1 className="text-3xl font-bold">Book Details</h1>
            </div>

            <Link
                href={"/books"} className="flex place-items-center gap-2 cursor-pointer whitespace-nowrap transition-transform duration-200 ease-out hover:scale-105 active:scale-95 text-light-text2 hover:text-light-purple">
                <PiArrowLeftLight />
                <span>Back to books</span>
            </Link>
        </div >
    );
}
