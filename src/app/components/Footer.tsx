import Link from 'next/link';
import { BuyMeACoffeIcon, FooterCurveIcon, Logo } from './Icons';

export default function Footer(): JSX.Element {
   return (
      <footer className="bg-accent-light relative">
         <div className="container text-center mx-auto grid grid-cols-12 p-10 mb-10 z-10">
            <div className="about col-span-3">
               <h3 className="text-center">About</h3>
               <div className="text">
                  <p>Hello 👋, I am Mohamed a 22yo programmer from <span className="underline location relative">Málaga</span>, Spain📍 who loves the website frontend and backend.</p>
                  <p>This website is part of my final project of my degree, was made using the ReactJS framework <Link href="https://nextjs.org" className="font-bold underline">NextJS</Link>.</p>
               </div>
            </div>
            <div className="logo flex flex-col gap-5 items-center col-span-6">
               <h2 className="text-2xl font-extrabold">WEBMARKS</h2>
               <Logo />
            </div>
            <div className="coffee col-span-3 flex flex-col items-center gap-5">
               <h3>Buy me a coffee</h3>
               <p>Please consider buy me a coffee if you think it deserves it.</p>

               <Link href="https://www.buymeacoffeee.com/mohamedbh" className="font-bold" target="_blank" rel="noreferrer">
                  <BuyMeACoffeIcon />
               </Link>
            </div>
         </div>
         <div className="bg-accent-darker h-[100px] w-full absolute bottom-0">
            <FooterCurveIcon />
         </div>
      </footer>
   );
}
