// src/pages/Album.jsx
import { Head, usePage } from '@inertiajs/react'; // Inertia.js hooks untuk mengatur Head dan mengambil data user
import Sidebar from '@/Components/Sidebar'; // Sidebar yang sudah dibuat
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Layout yang sudah ada

export default function Album() {
    const { user } = usePage().props.auth; // Mengambil data user yang sedang login

    // Contoh data album dengan kategori galeri
    const albums = [
        {
            title: "Nature",
            gallery: [
                { id: 1, title: "Mountain View", image: "https://via.placeholder.com/300" },
                { id: 2, title: "Forest Path", image: "https://via.placeholder.com/300" },
                { id: 3, title: "Sunset Beach", image: "https://via.placeholder.com/300" }
            ]
        },
        {
            title: "Travel",
            gallery: [
                { id: 4, title: "Paris City", image: "https://via.placeholder.com/300" },
                { id: 5, title: "New York Skyline", image: "https://via.placeholder.com/300" }
            ]
        },
        {
            title: "Portraits",
            gallery: [
                { id: 6, title: "Portrait of Man", image: "https://via.placeholder.com/300" },
                { id: 7, title: "Portrait of Woman", image: "https://via.placeholder.com/300" }
            ]
        }
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Album" />

            <div className="flex">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content Area */}
                <div className="flex-1 p-6 transition-all ml-0 sm:ml-64">
                    {/* Album Header */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-semibold text-gray-800">Your Albums</h1>

                        {/* Search Bar */}
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Search your albums..."
                                className="p-2 border rounded-lg w-64"
                            />
                            <button className="bg-blue-500 text-white p-2 rounded-lg">Search</button>
                        </div>
                    </div>

                    {/* Album Content */}
                    <div className="mt-6">
                        {albums.map((album, index) => (
                            <div key={index} className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-800">{album.title}</h2>

                                {/* Foto-foto dalam album */}
                                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {album.gallery.map((photo) => (
                                        <div key={photo.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                            <img
                                                src={photo.image}
                                                alt={photo.title}
                                                className="w-full h-48 object-cover rounded-md"
                                            />
                                            <p className="mt-2 text-gray-600 text-sm">{photo.title}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
