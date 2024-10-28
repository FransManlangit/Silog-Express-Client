import React, { useState, useEffect } from "react";
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa6";
import { AiOutlineMenu } from "react-icons/ai";
import { FaBasketShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from "@headlessui/react";
import {
    ArrowLeftStartOnRectangleIcon,
    ChevronDownIcon,
    UserIcon,
} from "@heroicons/react/16/solid";
import { IoIosPeople } from "react-icons/io";


const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, loading } = useSelector((state) => state.authUser);

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
        return activeSection === hash ? "text-zinc-500" : "text-[#FF7518]";
    };

    const getUnderlineClass = (hashes) => {
        return hashes.includes(activeSection) ? "scale-x-100" : "scale-x-0";
    };

    const LogoutHandler = () => {
        dispatch(Logout());
        navigate("/");
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
                        height={148}
                        width={161}
                        alt="Logo"
                    />
                    <h1 className="font-montserrat font-bold text-[24px] text-[#D56F00]">Silog Xpress</h1>
                </a>

                {/* Hamburger Icon for small screens */}
                <div className="block sm:hidden">
                    <button onClick={toggleMenu} className="text-white">
                        <AiOutlineMenu size={24} />
                    </button>
                </div>

                {/* Desktop Navigation (hidden on small screens) */}
                <div className="text-xl hidden sm:flex flex-row justify-center items-center gap-8 w-4/12">
                    {[
                        { href: "#home", name: "Home" },
                        { href: "#menu", name: "Menu" },
                        { href: "#about", name: "About" },
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

                <div className="hidden sm:flex flex-row justify-end items-center gap-10 w-4/12">
                    {/* Only one button here, not nested */}
                    <button className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <FaBasketShopping size={45} className="text-[#FF7518]" />
                    </button>

                    {/* Login Button */}
                    <div>
                        {user ? (
                            <Menu>
                                <MenuButton className="inline-flex items-center gap-2 rounded-full bg-[#D56F00] py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-[#D56F00] open:bg--500/90 focus:outline-white">
                                    {user?.avatar?.url ? (
                                        <img
                                            src={user?.avatar?.url}
                                            alt="SariSariCart Logo"
                                            className="h-8 w-8 rounded-full"
                                        />
                                    ) : (
                                        <UserIcon className="w-8 h-8 p-1" />
                                    )}

                                    <span>{user.firstname}</span>
                                    <ChevronDownIcon className="w-4 h-4 fill-white/60" />
                                </MenuButton>
                                <Transition
                                    enter="transition ease-out duration-75"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <MenuItems
                                        anchor="bottom end"
                                        className="w-52 origin-top-right rounded-xl bg-[#D56F00]/90 p-1 text-sm text-white focus:outline-none mt-1 space-y-1"
                                    >
                                        <MenuItem>
                                            <a
                                                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 focus:bg-white/10"
                                                href="/profile"
                                            >
                                                <UserIcon className="w-6 h-6 fill-white/60" />
                                                Profile
                                            </a>
                                        </MenuItem>
                                        <MenuItem>
                                            <a className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 focus:bg-white/10"
                                                href="/memberlist"
                                            >
                                                <IoIosPeople className="w-6 h-6 fill-white/60" />
                                                Member List
                                            </a>
                                        </MenuItem>
                                        <div className="my-1 h-px bg-white/5" />
                                        <MenuItem>
                                            <button
                                                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 focus:bg-white/10"
                                                onClick={LogoutHandler}
                                            >
                                                <ArrowLeftStartOnRectangleIcon className="w-6 h-6 fill-white/60" />
                                                Logout
                                            </button>
                                        </MenuItem>
                                    </MenuItems>
                                </Transition>
                            </Menu>
                        ) : (
                            <button onClick={() => navigate("/login")} className="border border-[#D56F00] text-[#D56F00] font-montserrat px-12 py-2 rounded-full hover:bg-[#D56F00] hover:text-white transition-colors duration-300">
                                Login
                            </button>
                        )}
                    </div>

                </div>
            </div>

            {/* Fullscreen Menu for Small Screens */}
            {menuOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-[#FAE500] bg-opacity-90 flex flex-col items-center justify-center z-50">
                    <button onClick={toggleMenu} className="absolute top-5 right-5 text-white">
                        Close
                    </button>
                    <div className="flex flex-col gap-8 ">
                        {[
                            { href: "#home", name: "Home" },
                            { href: "#menu", name: "Menu" },
                            { href: "#about", name: "About" },

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
