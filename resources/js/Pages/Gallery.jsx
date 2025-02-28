import Sidebar from '@/Components/Sidebar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Gallery() {
    const { user } = usePage().props.auth;
    const [images, setImages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState(new Set()); // State for favorite image IDs
    const [modalImage, setModalImage] = useState(null); // State to manage image modal

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
        
        // Load favorite status from localStorage
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(new Set(savedFavorites));
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
                setFavorites(prev => {
                    const newFavorites = new Set(prev);
                    newFavorites.delete(id);
                    return newFavorites;
                });
            } catch (error) {
                console.error("Error deleting image:", error);
            }
        }
    };

    const handleRename = async (id) => {
        const newName = prompt("Enter new name for the image:");
        if (newName) {
            try {
                await axios.put(route('images.update', id), { file_name: newName });
                setImages(images.map(image => (image.id === id ? { ...image, file_name: newName } : image)));
            } catch (error) {
                console.error("Error renaming image:", error);
            }
        }
    };

    const toggleFavorite = async (id) => {
        try {
            if (favorites.has(id)) {
                // If already a favorite, remove it
                await axios.delete(route('favorites.destroy', id));
                alert("Image removed from favorites!"); // Alert when removing from favorites
            } else {
                // If not a favorite, add to favorites
                await axios.post(route('favorites.store'), { image_id: id });
                alert("Image added to favorites!"); // Alert when adding to favorites
            }
            setFavorites(prev => {
                const newFavorites = new Set(prev);
                if (newFavorites.has(id)) {
                    newFavorites.delete(id);
                } else {
                    newFavorites.add(id);
                }

                // Save updated favorites to localStorage
                localStorage.setItem('favorites', JSON.stringify(Array.from(newFavorites)));

                return newFavorites;
            });
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    const openModal = (image) => {
        setModalImage(image); // Set the clicked image to display in the modal
    };

    const closeModal = () => {
        setModalImage(null); // Close the modal by setting it to null
    };

    return (
        <AuthenticatedLayout>
            <Head title="Gallery" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
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
                                        src={`/storage/${image.file_path}`}
                                        alt={image.file_name}
                                        className="w-full h-48 object-cover rounded-md cursor-pointer"
                                        onClick={() => openModal(image)} // Open modal when clicked
                                    />
                                    <p className="mt-2 text-gray-600 text-sm">{image.file_name}</p>
                                    <div className="flex space-x-2 mt-2">
                                        <button onClick={() => handleRename(image.id)} className="bg-yellow-500 text-white p-2 rounded-lg">Rename</button>
                                        <button onClick={() => handleDelete(image.id)} className="bg-red-500 text-white p-2 rounded-lg">Delete</button>
                                        <button 
                                            onClick={() => toggleFavorite(image.id)} 
                                            className={`p-2 rounded-lg ${favorites.has(image.id) ? 'text-yellow-500' : 'text-gray-400'}`}
                                        >
                                            <i className={`fas fa-star ${favorites.has(image.id) ? 'text-yellow-500' : 'text-gray-400'}`}></i>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No images found.</p>
                        )}
                    </div>

                    {/* Modal for full image view */}
                    {modalImage && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg relative">
            <button
                className="absolute top-2 right-2 text-gray-700 text-3xl"
                onClick={closeModal}
            >
                &times;
            </button>
            <img
                src={`/storage/${modalImage.file_path}`}
                alt={modalImage.file_name}
                className="max-w-full max-h-[90vh] object-contain"
            />
        </div>
    </div>
)}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
