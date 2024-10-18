import React, { useState, useEffect } from "react";
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa6";
import { AiOutlineMenu } from "react-icons/ai";
import { FaBasketShopping } from "react-icons/fa6";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        const handleHashChange = () => {
            setActiveSection(window.location.hash || "#home");
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("hashchange", handleHashChange);

        // Set the initial active section
        setActiveSection(window.location.hash || "#home");

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);

    const getLinkClass = (hash) => {
        return activeSection === hash ? "text-black" : "text-[#FF7518]";
    };

    const getUnderlineClass = (hashes) => {
        return hashes.includes(activeSection) ? "scale-x-100" : "scale-x-0";
    };

    const toggleMenu = () => setMenuOpen(!menuOpen); // Toggle menu function

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 px-10 sm:px-20 md:px-32 lg:px-40 xl:px-48 transition-colors duration-300 ${scrolled ? "bg-zinc-200" : "bg-transparent"
                }`}
        >
            <div className="flex flex-row justify-between items-center py-5">
                <a
                    href="#home"
                    className="flex flex-row justify-start items-center gap-4 w-4/12"
                >
                    <img
                        src="/images/Logo.png"
                        height={80}
                        width={80}
                        alt="Logo"
                    />
                    <h1 className="font-montserrat font-bold text-lg text-[#D56F00]">Silog Xpress</h1>
                </a>

                {/* Hamburger Icon for small screens */}
                <div className="block sm:hidden">
                    <button onClick={toggleMenu} className="text-white">
                        <AiOutlineMenu size={24} />
                    </button>
                </div>

                {/* Desktop Navigation (hidden on small screens) */}
                <div className="hidden sm:flex flex-row justify-center items-center gap-8 w-4/12">
                    {[
                        { href: "#home", name: "Home" },
                        { href: "#menu", name: "Menu" },
                    ].map(({ href, name }) => (
                        <a
                            key={href}
                            href={href}
                            className={`font-montserrat relative group cursor-pointer ${getLinkClass(
                                href
                            )}`}
                        >
                            {name}
                            <span
                                className={`rounded block absolute left-1/2 bottom-0 h-0.5 bg-white group-hover:bg-[#FF7518] w-full transform -translate-x-1/2 transition-transform duration-300 group-hover:scale-x-100 ${getUnderlineClass(
                                    [href]
                                )}`}></span>
                        </a>
                    ))}
                </div>

                <div className="hidden sm:flex flex-row justify-end items-center gap-4 w-4/12">
                    {/* Only one button here, not nested */}
                    <button className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <FaBasketShopping size={30} className="text-[#FF7518]" />
                    </button>
                </div>
            </div>

            {/* Fullscreen Menu for Small Screens */}
            {menuOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-[#FAE500] bg-opacity-90 flex flex-col items-center justify-center z-50">
                    <button onClick={toggleMenu} className="absolute top-5 right-5 text-white">
                        Close
                    </button>
                    <div className="flex flex-col gap-8">
                        {[
                            { href: "#home", name: "Home" },
                            { href: "#services", name: "Services" },
                            { href: "#portfolio", name: "Portfolio" },
                            { href: "#ourteam", name: "Our Team" }
                        ].map(({ href, name }) => (
                            <a
                                key={href}
                                href={href}
                                onClick={toggleMenu} // Close menu on link click
                                className={`font-montserrat text-2xl text-white ${getLinkClass(href)}`}
                            >
                                {name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
