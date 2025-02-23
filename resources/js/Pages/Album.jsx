import { Head, usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Album() {
    const { albums: initialAlbums, auth } = usePage().props;
    const [albums, setAlbums] = useState(initialAlbums);
    const [isCreatingAlbum, setIsCreatingAlbum] = useState(false);
    const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        if (selectedAlbum) {
            const updatedAlbum = albums.find((album) => album.id === selectedAlbum.id);
            if (updatedAlbum) {
                setSelectedAlbum(updatedAlbum);
            }
        }
    }, [albums]);

    const handleAlbumClick = (album) => {
        setSelectedAlbum(album); // Store album data in state
    };

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        
        try {
            await axios.post("/albums", { title, description });
    
            window.location.reload(); // 🔄 Reload after successful album creation
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error("Error creating album:", error);
            }
        }
    };

    const handleDeleteAlbum = async (albumId) => {
        if (!window.confirm("Are you sure you want to delete this album?")) return;
    
        try {
            await axios.delete(`/albums/delete/${albumId}`);
    
            window.location.reload(); // 🔄 Reload after successful album deletion
        } catch (error) {
            console.error("Error deleting album:", error.response?.data || error.message);
        }
    };

    const handlePhotoUpload = async (e) => {
        e.preventDefault();

        if (!selectedAlbum || !photo) {
            console.error("Album or Photo not selected.");
            return;
        }

        const formData = new FormData();
        formData.append("photo", photo);

        try {
            const response = await axios.post(`/albums/${selectedAlbum.id}/photos`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // ✅ Update albums list
            setAlbums((prevAlbums) =>
                prevAlbums.map((album) =>
                    album.id === selectedAlbum.id
                        ? { ...album, photos: [...album.photos, response.data.photo] }
                        : album
                )
            );

            setIsUploadingPhoto(false);
            setPhoto(null);
        } catch (error) {
            console.error("Upload failed:", error.response?.data || error.message);
        }
    };

    const handleDeletePhoto = async (photoId) => {
        if (!selectedAlbum) return;
        if (!window.confirm("Are you sure you want to delete this photo?")) return;
    
        try {
            await axios.delete(`/photos/${photoId}`);
    
            // ✅ Remove photo from state without refreshing
            setAlbums((prevAlbums) =>
                prevAlbums.map((album) =>
                    album.id === selectedAlbum.id
                        ? { ...album, photos: album.photos.filter((photo) => photo.id !== photoId) }
                        : album
                )
            );
        } catch (error) {
            console.error("Failed to delete photo:", error.response?.data || error.message);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Album" />
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-6 ml-0 sm:ml-64">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-semibold text-gray-800">Your Albums</h1>
                        <button onClick={() => setIsCreatingAlbum(true)} className="bg-green-500 text-white p-2 rounded-lg">
                            Create Album
                        </button>
                    </div>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {albums.length > 0 ? (
                            albums.map((album) => (
                                <div key={album.id} className="bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer" onClick={() => handleAlbumClick(album)}>
                                    <div className="flex items-center justify-between">
                                        <h2 
                                            className="text-xl font-semibold text-gray-800 cursor-pointer"
                                            onClick={() => handleAlbumClick(album)}
                                        >
                                            {album.title}
                                        </h2>
                                        
                                        {/* Delete Button (Top Right) */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Stop click from triggering album modal
                                                handleDeleteAlbum(album.id);
                                            }}
                                            className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                                        >
                                            🗑
                                        </button>
                                    </div>
                                    {/* Album cover (first photo in album) */}
                                    <div className="mt-4">
                                        {album.photos.length > 0 ? (
                                            <img
                                                src={`/storage/${album.photos[0].path}`}
                                                alt="Album Cover"
                                                className="w-full h-40 object-cover rounded-lg"
                                            />
                                        ) : (
                                            <p className="text-gray-500">No photos in this album.</p>
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

            {selectedAlbum && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-3/4 lg:w-2/3 max-h-[80vh] overflow-y-auto">
                        <h2 className="text-2xl font-semibold text-gray-800">{selectedAlbum.title}</h2>
                        <p className="text-gray-600 mb-4">{selectedAlbum.description}</p>

                        {/* Grid of Photos */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {selectedAlbum.photos.length > 0 ? (
                                selectedAlbum.photos.map((photo) => (
                                    <div key={photo.id} className="relative">
                                        <img
                                            src={`/storage/${photo.path}`}
                                            alt="Album Photo"
                                            className="w-full h-100 object-cover rounded-lg shadow-md"
                                        />
                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDeletePhoto(photo.id)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                        >
                                            ✖
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No photos in this album.</p>
                            )}
                        </div>

                        {/* Close Button */}
                        <div className="mt-4 flex justify-start space-x-4">
                            <button type="button" onClick={() => setSelectedAlbum(null)} className="bg-gray-300 text-gray-700 p-2 rounded-lg">
                                Cancel
                            </button>
                            <button type="button" onClick={() => setIsUploadingPhoto(true)} className="bg-blue-500 text-white p-2 rounded-lg">
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isCreatingAlbum && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
                        <h2 className="text-2xl font-semibold text-gray-800">Create New Album</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700">Album Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="p-2 border rounded-lg w-full"
                                />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title[0]}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700">Album Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="p-2 border rounded-lg w-full"
                                />
                                {errors.description && <p className="text-red-500 text-sm">{errors.description[0]}</p>}
                            </div>
                            <div className="mt-4 flex justify-start space-x-4">
                                <button type="button" onClick={() => setIsCreatingAlbum(false)} className="bg-gray-300 text-gray-700 p-2 rounded-lg">
                                    Cancel
                                </button>
                                <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
                                    Add Album
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
                                <button type="button" onClick={() => setIsUploadingPhoto(false)} className="bg-gray-300 text-gray-700 p-2 rounded-lg">
                                    Cancel
                                </button>
                                <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
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
