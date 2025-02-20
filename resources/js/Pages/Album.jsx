import { Head, usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import axios from 'axios'; // Pastikan axios diimpor
import { Inertia } from '@inertiajs/inertia';

export default function Album() {
    const { albums, auth } = usePage().props; // Mengambil data album dari server
    const [isCreatingAlbum, setIsCreatingAlbum] = useState(false);
    const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [photo, setPhoto] = useState(null);

    const handleCreateAlbum = () => {
        setIsCreatingAlbum(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = auth.user.id;

        Inertia.post('/albums', { 
            title, 
            description, 
            user_id: userId     
        }, {
            onSuccess: () => {
                setIsCreatingAlbum(false);
                setTitle('');
                setDescription('');
            },
            onError: (errors) => {
                setErrors(errors);
            }
        });
    };

    const handleAlbumClick = (albumId) => {
        setSelectedAlbum(albumId);
        setIsUploadingPhoto(true);
    };

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handlePhotoUpload = async (e) => {
        e.preventDefault();

        if (!selectedAlbum || !photo) {
            console.error("Album or Photo not selected.");
            return;
        }

        const formData = new FormData();
        formData.append('photo', photo);

        try {
            const response = await axios.post(`/albums/${selectedAlbum}/photos`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Photo uploaded successfully:', response.data);
            setPhoto(null); // Reset foto setelah upload
            setIsUploadingPhoto(false); // Selesai unggah foto
        } catch (error) {
            console.error('Error uploading photo:', error);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Album" />

            <div className="flex">
                <Sidebar />

                <div className="flex-1 p-6 transition-all ml-0 sm:ml-64">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-semibold text-gray-800">Your Albums</h1>
                        <button
                            onClick={handleCreateAlbum}
                            className="bg-green-500 text-white p-2 rounded-lg"
                        >
                            Create Album
                        </button>
                    </div>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {albums && albums.length > 0 ? (
                            albums.map((album) => (
                                <div
                                    key={album.id}
                                    className="bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer"
                                    onClick={() => handleAlbumClick(album.id)}
                                >
                                    <h2 className="text-xl font-semibold text-gray-800">{album.title}</h2>
                                    
                                    {/* Menampilkan foto-foto dalam album */}
                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                    {album.photos && album.photos.length > 0 ? (
     album.photos.map((photo) => {
        console.log(photo.url); // Log URL untuk memastikan nilai yang benar
        return (
            <div key={photo.id} className="photo-container">
                <img
                    src={photo.url}
                    alt="Album Photo"
                    className="w-full h-32 object-cover rounded-lg"
                />
            </div>
        );
    })
) : (
    <p>No photos found in this album.</p>
)}

                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No albums found.</p>
                        )}
                    </div>
                </div>
            </div>

            {isCreatingAlbum && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
                        <h2 className="text-2xl font-semibold text-gray-800">Create New Album</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mt-4">
                                <label className="block text-gray-700">Album Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter album title"
                                    className="p-2 border rounded-lg w-full mt-2"
                                />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700">Album Description</label>
                                <textarea
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter album description"
                                    className="p-2 border rounded-lg w-full mt-2"
                                />
                                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                            </div>
                            <div className="mt-4 flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setIsCreatingAlbum(false)}
                                    className="bg-gray-300 text-gray-700 p-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white p-2 rounded-lg"
                                >
                                    Create Album
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isUploadingPhoto && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
                        <h2 className="text-2xl font-semibold text-gray-800">Upload Photo to Album</h2>
                        <form onSubmit={handlePhotoUpload}>
                            <div className="mt-4">
                                <input
                                    type="file"
                                    onChange={handlePhotoChange}
                                    accept="image/*"
                                    className="p-2 border rounded-lg w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setIsUploadingPhoto(false)}
                                    className="bg-gray-300 text-gray-700 p-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white p-2 rounded-lg"
                                    disabled={!photo}
                                >
                                    Upload Photo
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
