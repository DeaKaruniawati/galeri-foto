import Sidebar from '@/Components/Sidebar'; // Sidebar yang sudah dibuat
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Layout yang sudah ada
import { Head, usePage } from '@inertiajs/react'; // Head untuk mengatur title halaman dan usePage untuk mengambil data user
import { useEffect, useState } from 'react'; // Mengimpor useEffect dan useState dari react
import axios from 'axios'; // Kita akan menggunakan axios untuk mengambil gambar

export default function Gallery() {
    const { user } = usePage().props.auth; // Mengambil data user yang sedang login
    const [images, setImages] = useState([]); // State untuk menyimpan gambar
    const [searchQuery, setSearchQuery] = useState(''); // State untuk menyimpan query pencarian

    // Fetch images from the server
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(route('images.index'));
                setImages(response.data); // Menyimpan gambar ke state
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, []); // Hanya dijalankan sekali saat komponen dimuat

    // Filter images based on the search query
    const filteredImages = images.filter((image) =>
        image.file_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle search query change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); // Update the search query state
    };

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
                                value={searchQuery} // Bind the input value to the searchQuery state
                                onChange={handleSearchChange} // Handle changes to search input
                            />
                            <button className="bg-blue-500 text-white p-2 rounded-lg">Search</button>
                        </div>
                    </div>

                    {/* Gallery Content */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredImages.length > 0 ? (
                            filteredImages.map((image) => (
                                <div key={image.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                    <img
                                        src={`/storage/images/${image.file_name}`} // Pastikan path ini sesuai
                                        alt={image.file_name}
                                        className="w-full h-48 object-cover rounded-md"
                                    />
                                    <p className="mt-2 text-gray-600 text-sm">{image.file_name}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No images found.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
