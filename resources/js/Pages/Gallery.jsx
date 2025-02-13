import Sidebar from '@/Components/Sidebar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Gallery() {
    const { user } = usePage().props.auth;
    const [images, setImages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(route('images.index'));
                setImages(response.data);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, []);

    const filteredImages = images.filter((image) =>
        image.file_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this image?")) {
            try {
                await axios.delete(route('images.destroy', id));
                setImages(images.filter(image => image.id !== id));
            } catch (error) {
                console.error("Error deleting image:", error);
            }
        }
    };

    const handleRename = async (id) => {
        const newName = prompt("Enter new name for the image:");
        if (newName) {
            try {
                const response = await axios.put(route('images.update', id), { file_name: newName });
                // Update the state with the new file name
                setImages(images.map(image => (image.id === id ? { ...image, file_name: newName } : image)));
            } catch (error) {
                console.error("Error renaming image:", error);
            }
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Gallery" />

            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-6 transition-all ml-0 sm:ml-64">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-semibold text-gray-800">Your Gallery</h1>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Search your gallery..."
                                className="p-2 border rounded-lg w-64"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <button className="bg-blue-500 text-white p-2 rounded-lg">Search</button>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredImages.length > 0 ? (
                            filteredImages.map((image) => (
                                <div key={image.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                    <img
                                        src={`/storage/images/${image.file_name}`}
                                        alt={image.file_name}
                                        className="w-full h-48 object-cover rounded-md"
                                    />
                                    <p className="mt-2 text-gray-600 text-sm">{image.file_name}</p>
                                    <div className="flex space-x-2 mt-2">
                                        <button onClick={() => handleRename(image.id)} className="bg-yellow-500 text-white p-2 rounded-lg">Rename</button>
                                        <button onClick={() => handleDelete(image.id)} className="bg-red-500 text-white p-2 rounded-lg">Delete</button>
                                    </div>
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