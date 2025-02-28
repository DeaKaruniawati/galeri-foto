import Sidebar from '@/Components/Sidebar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Favorit() {
    const { user } = usePage().props.auth; // Mengambil data user yang sedang login
    const [favorites, setFavorites] = useState([]);
    const [modalImage, setModalImage] = useState(null);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get(route('favorites.index'));
                setFavorites(response.data.favorites);
            } catch (error) {
                console.error("Error fetching favorites:", error);
            }
        };

        fetchFavorites();
    }, []);

    const openModal = (image) => {
        setModalImage(image); // Set the clicked image to display in the modal
    };

    const closeModal = () => {
        setModalImage(null); // Close the modal by setting it to null
    };


    return (
        <AuthenticatedLayout>
            <Head title="Favorit" />

            <div className="flex">
                <Sidebar />

                <div className="flex-1 p-6 transition-all ml-0 sm:ml-64">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-semibold text-gray-800">Your Favorite Photos</h1>

                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Search your favorites..."
                                className="p-2 border rounded-lg w-64"
                            />
                            <button className="bg-blue-500 text-white p-2 rounded-lg">Search</button>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favorites.length > 0 ? (
                            favorites.map((favorite) => (
                                <div key={favorite.image.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                    <img
                                        src={`/storage/${favorite.image.file_path}`}
                                        alt={favorite.image.file_name}
                                        className="w-full h-48 object-cover rounded-md cursor-pointer"
                                        onClick={() => openModal(favorite)}
                                    />
                                    <p className="mt-2 text-gray-600 text-sm">{favorite.image.file_name}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No favorite images found.</p>
                        )}
                    </div>

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
                                    src={`/storage/${modalImage.image.file_path}`}
                                    alt={modalImage.image.file_name}
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