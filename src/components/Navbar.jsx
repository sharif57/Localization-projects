import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlignHorizontalJustifyCenter, ChevronDown, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();
    const { t, i18n } = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    const menuList = [
        { title: t('home'), path: '/' },
        { title: t('Location'), path: '/location' },
        { title: t('contact'), path: '/counter' },
        { title: t('about_us'), path: '/rtk' },
        { title: t('RTK Query'), path: '/rtkQuery' },
        {
            title: t('pages'),
            icon: <ChevronDown className="inline w-4 h-4 ml-1" />,
            submenu: [
                {
                    title: t('english'),
                    onClick: () => changeLanguage('en'),
                },
                {
                    title: t('bangla'),
                    onClick: () => changeLanguage('bn'),
                },
            ],
        },
    ];

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    {/* <img className="w-40 md:w-48" src={'/Group 169.svg'} alt="Logo" /> */}
                    <AlignHorizontalJustifyCenter className='size-20' />
                </Link>

                {/* Hamburger menu icon for mobile */}
                <div className="lg:hidden" onClick={() => setOpen(!open)}>
                    {!open ? <Menu className="w-6 h-6 text-primary" /> : <X className="w-6 h-6 text-primary" />}
                </div>

                {/* Menu items */}
                <ul
                    className={`lg:flex items-center gap-8 text-xl absolute lg:static bg-white lg:bg-transparent w-full lg:w-auto left-0 lg:left-auto transition-all duration-300 ease-in-out ${open ? 'top-20 p-6 lg:p-0' : '-top-96'}`}
                >
                    {menuList.map((item, index) => (
                        <li
                            key={index}
                            className={`relative ${item.path === pathname ? 'text-primary font-bold' : 'text-black'} text-lg lg:my-0 my-2`}
                        >
                            <Link to={item.path} className="flex items-center hover:text-primary transition duration-200">
                                {item.title}
                                {item.icon && item.icon}
                            </Link>

                            {/* Dropdown menu for Pages */}
                            {item.submenu && (
                                <ul className="absolute left-0 mt-2 bg-white shadow-lg border rounded-lg w-48 text-black z-10">
                                    {item.submenu.map((subItem, subIndex) => (
                                        <li
                                            key={subIndex}
                                            className="px-4 py-2 hover:bg-primary hover:text-white transition duration-200"
                                            onClick={subItem.onClick}
                                        >
                                            {subItem.title}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
