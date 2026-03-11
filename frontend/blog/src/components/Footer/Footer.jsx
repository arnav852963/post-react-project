import React from 'react';
import { Link } from 'react-router-dom';

import {Logo} from "../Logo.jsx";
const Footer = () => {
    return (
        <section className="relative overflow-hidden py-12 bg-[#B4FF39] border-t-4 border-black font-sans">
            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-6 inline-flex items-center">
                                <div className="bg-white p-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <Logo width="120px" />
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-black uppercase tracking-tight text-black">
                                    &copy; 2026 — DEVUI.
                                    <span className="block mt-1 italic">STAY WEIRD.</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="mb-6 text-sm font-black uppercase tracking-widest text-black underline decoration-2 underline-offset-4">
                                Company
                            </h3>
                            <ul>
                                <li className="mb-3">
                                    <Link className="group inline-block text-base font-bold text-black transition-all hover:translate-x-1" to="/">
                                        <span className="group-hover:bg-white group-hover:px-1">Features</span>
                                    </Link>
                                </li>
                                <li className="mb-3">
                                    <Link className="group inline-block text-base font-bold text-black transition-all hover:translate-x-1" to="/">
                                        <span className="group-hover:bg-white group-hover:px-1">Pricing</span>
                                    </Link>
                                </li>
                                <li className="mb-3">
                                    <Link className="group inline-block text-base font-bold text-black transition-all hover:translate-x-1" to="/">
                                        <span className="group-hover:bg-white group-hover:px-1">Affiliate</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="group inline-block text-base font-bold text-black transition-all hover:translate-x-1" to="/">
                                        <span className="group-hover:bg-white group-hover:px-1">Press Kit</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="mb-6 text-sm font-black uppercase tracking-widest text-black underline decoration-2 underline-offset-4">
                                Support
                            </h3>
                            <ul>
                                <li className="mb-3">
                                    <Link className="group inline-block text-base font-bold text-black transition-all hover:translate-x-1" to="/">
                                        <span className="group-hover:bg-white group-hover:px-1">Account</span>
                                    </Link>
                                </li>
                                <li className="mb-3">
                                    <Link className="group inline-block text-base font-bold text-black transition-all hover:translate-x-1" to="/">
                                        <span className="group-hover:bg-white group-hover:px-1">Help</span>
                                    </Link>
                                </li>
                                <li className="mb-3">
                                    <Link className="group inline-block text-base font-bold text-black transition-all hover:translate-x-1" to="/">
                                        <span className="group-hover:bg-white group-hover:px-1">Contact Us</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="group inline-block text-base font-bold text-black transition-all hover:translate-x-1" to="/">
                                        <span className="group-hover:bg-white group-hover:px-1">Customer Support</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                        <div className="h-full">
                            <h3 className="mb-6 text-sm font-black uppercase tracking-widest text-black underline decoration-2 underline-offset-4">
                                Legals
                            </h3>
                            <ul>
                                <li className="mb-3">
                                    <Link className="group inline-block text-base font-bold text-black transition-all hover:translate-x-1" to="/">
                                        <span className="group-hover:bg-white group-hover:px-1">Terms & Conditions</span>
                                    </Link>
                                </li>
                                <li className="mb-3">
                                    <Link className="group inline-block text-base font-bold text-black transition-all hover:translate-x-1" to="/">
                                        <span className="group-hover:bg-white group-hover:px-1">Privacy Policy</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="group inline-block text-base font-bold text-black transition-all hover:translate-x-1" to="/">
                                        <span className="group-hover:bg-white group-hover:px-1">Licensing</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;