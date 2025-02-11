import Sidebar from '@/Components/Sidebar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Dashboard() {
    const { user } = usePage().props.auth;
    const [file, setFile] = useState(null);
    const [image, setImage] = useState([]);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile);
        setFile(selectedFile);

        // Preview the image selected
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setPreview(fileReader.result);
        };
        if (selectedFile) {
            fileReader.readAsDataURL(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file to upload");
            return;
        }

        const formData = new FormData();
        formData.append('image', file);
        formData.append('_token', document.head.querySelector('meta[name="csrf-token"]').content);

        try {
            const response = await fetch('/upload-image', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert("Image uploaded successfully!");
                fetchImages(); // Fetch images after upload
                setFile(null); // Reset file input
                setPreview(null); // Reset preview
            } else {
                alert("Failed to upload image.");
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const fetchImages = async () => {
        try {
            const response = await fetch('/get-image');
            const data = await response.json();
            setImage(data); // Update state with images from database
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    useEffect(() => {
        fetchImages(); // Fetch images when component loads
    }, []);

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="flex">
                <div className="flex-1 transition-all ml-0">
                    <div className="w-full flex items-center justify-between">
                        <h1 className="text-3xl font-semibold text-gray-800">Welcome to Your Dashboard</h1>

                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Search your gallery..."
                                className="p-2 border rounded-lg w-64"
                            />
                            <button className="bg-blue-500 text-white p-2 rounded-lg">Search</button>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h2 className="text-xl font-medium text-gray-700">Hi, {user.name}!</h2>
                    </div>

                    <div className="mt-8">
                        {/* Input File Hidden */}
                        <input
                            id="file-input"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />

                        <div className="flex justify-between items-center">
                            <button
                                className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                                onClick={() => document.getElementById('file-input').click()} // Trigger file input when clicked
                            >
                                Choose Photo
                            </button>

                            <button
                                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                                onClick={handleUpload}
                            >
                                Upload Photo
                            </button>
                        </div>

                        {/* Preview Image */}
                        {preview && (
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-gray-800">Preview:</h3>
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="mt-2 w-64 h-64 object-cover rounded-md"
                                />
                            </div>
                        )}
                    </div>

                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold text-gray-800">Your Photos Gallery</h2>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {image.length > 0 ? (
                                image.map((img) => (
                                    <div key={img.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                        <img
                                            src={`http://localhost/storage/${img.file_path}`}
                                            alt={img.filename}
                                            className="w-full h-48 object-cover rounded-md"
                                        />
                                        <p className="mt-2 text-gray-600 text-sm">{img.file_name}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No image uploaded yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
