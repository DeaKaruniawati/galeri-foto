import Sidebar from "@/Components/Sidebar"; // Sidebar yang sudah dibuat
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"; // Layout yang sudah ada
import { Head, useForm, usePage } from "@inertiajs/react"; // Head untuk mengatur title halaman dan usePage untuk mengambil data user
import axios from "axios";
import { useState } from "react"; // Menggunakan useState untuk kontrol form

export default function Dashboard() {
    const { user } = usePage().props.auth; // Mengambil data user yang sedang login
    const { data, setData, errors, post, progress } = useForm({
        image: null,
    });


    // Fungsi untuk mengupload file (bisa disesuaikan dengan API atau backend Anda)
    const handleUpload = () => {
        if (!data) {
            alert("Please select a file to upload");
            return;
        }
        // Logic upload ke backend bisa dilakukan di sini
        post(route("file.upload.store"));
        setData("image",null);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="flex">
                {/* Main Content Area */}
                <div className="flex-1 transition-all ml-0">
                    {/* Dashboard Header */}
                    <div className="w-full flex items-center justify-between">
                        <h1 className="text-3xl font-semibold text-gray-800">
                            Welcome to Your Dashboard
                        </h1>

                        {/* Search Bar */}
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Search your gallery..."
                                className="p-2 border rounded-lg w-64"
                            />
                            <button className="bg-blue-500 text-white p-2 rounded-lg">
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Greeting with User Name */}
                    <div className="mt-4">
                        <h2 className="text-xl font-medium text-gray-700">
                            Hi, {user.name}!
                        </h2>
                    </div>

                    {/* Add New Photo Button */}
                    <div className="mt-8 flex justify-between items-center">
                        <button
                            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                            onClick={() =>
                                document.getElementById("file-input").click()
                            } // Trigger input file when clicked
                        >
                            Add New Photo
                        </button>

                        {/* Input File Hidden */}
                        <input
                            id="file-input"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => setData("image",e.target.files[0])}
                        />

                        {/* Upload Button */}
                        <button
                            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                            onClick={handleUpload}
                        >
                            Upload Photo
                        </button>
                    </div>

                    {/* Dashboard Body */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Stat 1 */}
                        <div className="bg-[#189797] p-4 rounded-lg shadow-md">
                            <h2 className="text-lg font-medium text-white">
                                Total Photos
                            </h2>
                            <p className="text-2xl font-semibold text-white">
                                120
                            </p>
                        </div>

                        {/* Stat 2 */}
                        <div className="bg-[#189797] p-4 rounded-lg shadow-md">
                            <h2 className="text-lg font-medium  text-white">
                                Favorite Photos
                            </h2>
                            <p className="text-2xl font-semibold  text-white">
                                25
                            </p>
                        </div>

                        {/* Stat 3 */}
                        <div className="bg-[#189797] p-4 rounded-lg shadow-md">
                            <h2 className="text-lg font-medium  text-white">
                                Uploaded This Week
                            </h2>
                            <p className="text-2xl font-semibold  text-white">
                                5
                            </p>
                        </div>
                    </div>

                    {/* Galeri atau Konten Lain */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Your Photos Gallery
                        </h2>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Contoh Foto */}
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <img
                                    src="https://via.placeholder.com/300"
                                    alt="Foto 1"
                                    className="w-full h-48 object-cover rounded-md"
                                />
                                <p className="mt-2 text-gray-600 text-sm">
                                    Photo 1
                                </p>
                            </div>
                            {/* Foto lainnya */}
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <img
                                    src="https://via.placeholder.com/300"
                                    alt="Foto 2"
                                    className="w-full h-48 object-cover rounded-md"
                                />
                                <p className="mt-2 text-gray-600 text-sm">
                                    Photo 2
                                </p>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <img
                                    src="https://via.placeholder.com/300"
                                    alt="Foto 3"
                                    className="w-full h-48 object-cover rounded-md"
                                />
                                <p className="mt-2 text-gray-600 text-sm">
                                    Photo 3
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
