import React from "react";
import { footerLinks } from "../assets/assets";
import { assets } from "../assets/assets";

const Footer = () => {
    
    return (
        <div className="px-6 md:px-16 lg:px-16 xl:px-27 mt-24 bg-primary/10">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4 py-10 border-b border-gray-500/30 text-gray-500">
                <div>
                    <img className="w-20 md:w-28" src={assets.logo} alt="logo" />
                    <p className="max-w-[300px] mt-6"> We delivered fresh groceries and snacks straight to your door. Trusted by thousands, we aim to make  your shopping experience simple and affordable.</p>
                </div>
                <div className="flex flex-wrap justify-between w-full md:w-[%] gap-2">
                    {footerLinks.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-gray-900 md:mb-4 mb-2">{section.title}</h3>
                            <ul className="text-sm space-y-1">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a href={link.url} className="hover:underline transition">{link.text}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
                Copyright {new Date().getFullYear()} © PinkStack.dev All Right Reserved.
            </p>
        </div>
    );
};
export default Footer;