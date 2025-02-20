import { Head, usePage } from '@inertiajs/react'; 
import Sidebar from '@/Components/Sidebar'; 
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; 
import { useState } from 'react'; 
import { Inertia } from '@inertiajs/inertia'; 

export default function Album() {
    const { albums } = usePage().props; // Mengambil data album dari server
    const [isCreatingAlbum, setIsCreatingAlbum] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false); // Pastikan ini ada
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [image, setImage] = useState(null);

    const handleCreateAlbum = () => {
        setIsCreatingAlbum(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Mencegah reload halaman
        const userId = usePage().props.auth.user.id;

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
        setIsUploadingImage(true); // Pastikan ini ada
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleImageUpload = (e) => {
        e.preventDefault();

        if (!selectedAlbum || !image) {
            console.error("Album or Image not selected.");
            return;
        }

        const formData = new FormData();
        formData.append('image', image);

        Inertia.post(`/albums/${selectedAlbum}/images`, formData, {
            onSuccess: () => {
                setImage(null);
                setIsUploadingImage(false);
            },
            onError: (errors) => {
                console.error(errors);
            }
        });
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
                    <div className="bg-white p-6 rounded-lg shadow-lg">
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

            {isUploadingImage && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-gray-800">Upload Image to Album</h2>
                        <form onSubmit={handleImageUpload}>
                            <div className="mt-4">
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="p-2 border rounded-lg"
                                />
                            </div>
                            <div className="mt-4 flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setIsUploadingImage(false)}
                                    className="bg-gray-300 text-gray-700 p-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white p-2 rounded-lg"
                                    disabled={!image}
                                >
                                    Upload Image
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
