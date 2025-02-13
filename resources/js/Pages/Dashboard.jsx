import Sidebar from "@/Components/Sidebar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
    const { user } = usePage().props.auth;
    const { data, setData, errors, post, progress } = useForm({
        image: null,
    });

    const [images, setImages] = useState([]);
    const [totalImages, setTotalImages] = useState(0);
    const [todayCount, setTodayCount] = useState(0);
    const [favoriteCount, setFavoriteCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(route('images.index'));
                setImages(response.data);
                setTotalImages(response.data.length);

                const todayResponse = await axios.get(route('images.today'));
                setImages(todayResponse.data.images);
                setTodayCount(todayResponse.data.count);

                const favoriteResponse = await axios.get(route('images.favorites'));
                setFavoriteCount(favoriteResponse.data.count);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };
    
        fetchImages();
    }, []);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image", file);

            const formData = new FormData();
            formData.append("image", file);

            try {
                const response = await axios.post(route("file.upload.store"), formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                console.log("Image uploaded:", response.data);
                setImages([...images, response.data.image]);
                setTotalImages(totalImages + 1);

                setData("image", null);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter images based on the search query
    const filteredImages = images.filter(image => image.file_name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="flex">
                <div className="flex-1 transition-all ml-0">
                    <div className="w-full flex items-center justify-between">
                        <h1 className="text-3xl font-semibold text-gray-800">
                            Welcome to Your Dashboard
                        </h1>

                        {/* Search Bar next to the "Welcome" title */}
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Search your gallery..."
                                className="p-2 border rounded-lg w-64"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                            <button className="bg-blue-500 text-white p-2 rounded-lg">Search</button>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h2 className="text-xl font-medium text-gray-700">
                            Hi, {user.name}!
                        </h2>
                    </div>

                    {/* Info Section - Make it Boxed */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold">Total Photos</h3>
                            <p>{totalImages}</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold">Photos Uploaded Today</h3>
                            <p>{todayCount}</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold">Favorite Photos</h3>
                            <p>{favoriteCount}</p>
                        </div>
                    </div>

                    {/* Upload Photo Section */}
                    <div className="mt-8 flex justify-between items-center">
                        <button
                            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                            onClick={() => document.getElementById("file-input").click()}
                        >
                            Choose Photo
                        </button>

                        <input
                            id="file-input"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>

                    {/* Dashboard Body - Grid Layout for Images */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredImages.map((image) => (
                            <div key={image.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <img
                                    src={`/storage/images/${image.file_name}`}
                                    alt={image.file_name}
                                    className="w-full h-48 object-cover rounded-md"
                                />
                                <p className="mt-2 text-gray-600 text-sm">{image.file_name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
