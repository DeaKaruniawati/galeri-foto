import { Link } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import { useState } from 'react';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false); // State untuk mengontrol apakah sidebar terbuka atau tidak

    const toggleSidebar = () => {
        setIsOpen(!isOpen); // Membalikkan nilai isOpen
    };

    return (
        <>
            {/* Tombol buka/tutup sidebar */}
            <button 
                onClick={toggleSidebar} // Fungsi toggle sidebar
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            {/* NAVIGATION */}
            <button 
                data-drawer-target="default-sidebar" 
                data-drawer-toggle="default-sidebar" 
                aria-controls="default-sidebar" 
                type="button" 
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside 
                id="default-sidebar" 
                className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li className="mb-4"> {/* Menambah jarak bawah antar elemen */}
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-5">Dashboard</span>
                            </a>
                        </li>
                        <li className="mb-4"> {/* Menambah jarak bawah antar elemen */}
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M2 5.5C2 5.22386 2.22386 5 2.5 5H21.5C21.7761 5 22 5.22386 22 5.5C22 5.77614 21.7761 6 21.5 6H2.5C2.22386 6 2 5.77614 2 5.5ZM3 4.25C3 4.06193 3.16193 3.875 3.375 3.875H20.625C20.8381 3.875 21 4.06193 21 4.25C21 4.43807 20.8381 4.625 20.625 4.625H3.375C3.16193 4.625 3 4.43807 3 4.25ZM2 10C2 9.72386 2.22386 9.5 2.5 9.5H21.5C21.7761 9.5 22 9.72386 22 10C22 10.2761 21.7761 10.5 21.5 10.5H2.5C2.22386 10.5 2 10.2761 2 10ZM3 8.75C3 8.56193 3.16193 8.375 3.375 8.375H20.625C20.8381 8.375 21 8.56193 21 8.75C21 8.93807 20.8381 9.125 20.625 9.125H3.375C3.16193 9.125 3 8.93807 3 8.75ZM2 14.5C2 14.2239 2.22386 14 2.5 14H21.5C21.7761 14 22 14.2239 22 14.5C22 14.7761 21.7761 15 21.5 15H2.5C2.22386 15 2 14.7761 2 14.5ZM3 13.25C3 13.0619 3.16193 12.875 3.375 12.875H20.625C20.8381 12.875 21 13.0619 21 13.25C21 13.4381 20.8381 13.625 20.625 13.625H3.375C3.16193 13.625 3 13.4381 3 13.25Z" />
                                </svg>
                                <span className="flex-1 ms-5 whitespace-nowrap">Galeri Saya</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                </svg>
                                <span className="flex-1 ms-5 whitespace-nowrap">Favorit Saya</span> {/* Menambahkan margin untuk memperlebar jarak */}
                            </a>
                        </li>
                        <li className="mb-4"> {/* Menambah jarak bawah antar elemen */}
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                               <path d="M19 3H5C4.44772 3 4 3.44772 4 4V20C4 20.5523 4.44772 21 5 21H19C19.5523 21 20 20.5523 20 20V4C20 3.44772 19.5523 3 19 3ZM5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H19C20.6569 22 22 20.6569 22 19V5C22 3.34315 20.6569 2 19 2H5ZM8 7H16V9H8V7ZM8 11H16V13H8V11ZM8 15H16V17H8V15Z"/>
                            </svg>
                                <span className="flex-1 ms-5 whitespace-nowrap">Album Saya</span>
                            </a>
                        </li>
                    </ul>  
                </div>
            </aside>
        </>
    );
}
