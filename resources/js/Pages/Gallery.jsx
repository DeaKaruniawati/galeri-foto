// src/pages/Gallery.jsx
import Sidebar from '@/Components/Sidebar'; // Sidebar yang sudah dibuat
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Layout yang sudah ada
import { Head, usePage } from '@inertiajs/react'; // Head untuk mengatur title halaman dan usePage untuk mengambil data user

export default function Gallery() {
    const { user } = usePage().props.auth; // Mengambil data user yang sedang login

    return (
        <AuthenticatedLayout>
            <Head title="Gallery" />

            <div className="flex">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content Area */}
                <div className="flex-1 p-6 transition-all ml-0 sm:ml-64">
                    {/* Gallery Header */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-semibold text-gray-800">Your Gallery</h1>

                        {/* Search Bar */}
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Search your gallery..."
                                className="p-2 border rounded-lg w-64"
                            />
                            <button className="bg-blue-500 text-white p-2 rounded-lg">Search</button>
                        </div>
                    </div>

                    {/* Gallery Content */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Contoh Foto */}
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <img
                                src="https://via.placeholder.com/300"
                                alt="Foto 1"
                                className="w-full h-48 object-cover rounded-md"
                            />
                            <p className="mt-2 text-gray-600 text-sm">Photo 1</p>
                        </div>
                        {/* Foto lainnya */}
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <img
                                src="https://via.placeholder.com/300"
                                alt="Foto 2"
                                className="w-full h-48 object-cover rounded-md"
                            />
                            <p className="mt-2 text-gray-600 text-sm">Photo 2</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <img
                                src="https://via.placeholder.com/300"
                                alt="Foto 3"
                                className="w-full h-48 object-cover rounded-md"
                            />
                            <p className="mt-2 text-gray-600 text-sm">Photo 3</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
