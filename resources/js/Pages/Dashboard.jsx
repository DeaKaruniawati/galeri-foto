import { useEffect, useState } from "react";
import Sidebar from "@/Components/Sidebar";
import axios from "axios";
import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    const { user } = usePage().props.auth; // Mengambil informasi pengguna dari props
    const [images, setImages] = useState([]); // Semua gambar (galeri)
    const [totalImages, setTotalImages] = useState(0);
    const [todayImages, setTodayImages] = useState([]); // Gambar yang di-upload hari ini
    const [favoriteCount, setFavoriteCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchImages = async () => {
            try {
                // Ambil semua gambar (galeri)
                const response = await axios.get(route('images.index'));
                setImages(response.data);
                setTotalImages(response.data.length);

                // Ambil gambar yang di-upload hari ini
                const todayResponse = await axios.get(route('images.today'));
                setTodayImages(todayResponse.data.images);

                // Ambil jumlah gambar yang difavoritkan
                const favoritesResponse = await axios.get(route('favorites.index'));
                setFavoriteCount(favoritesResponse.data.favoriteCount);
            } catch (error) {
                console.error("Kesalahan saat mengambil gambar:", error);
            }
        };

        fetchImages();
    }, []);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2048 * 1024) { // 2MB = 2048KB
                alert("Ukuran file terlalu besar! Maksimal ukuran file adalah 2MB.");
                return;
            }

            const formData = new FormData();
            formData.append("image", file);

            try {
                const response = await axios.post(route("file.upload.store"), formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                setImages([...images, response.data.image]); // Menambahkan gambar ke galeri
                setTotalImages(totalImages + 1);

                // Re-fetch gambar yang di-upload hari ini setelah upload
                const todayResponse = await axios.get(route('images.today'));
                setTodayImages(todayResponse.data.images);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter gambar yang di-upload hari ini berdasarkan query pencarian
    const filteredTodayImages = todayImages.filter((image) =>
        image.file_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-6 ml-0 sm:ml-64">
                    <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-semibold text-gray-800">Hi, {user.name}! Selamat Datang</h1>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Cari di galeri hari ini..."
                                className="p-2 border rounded-lg w-64"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                            <button className="bg-blue-500 text-white p-2 rounded-lg">Cari</button>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h2 className="text-xl font-medium text-gray-700">Halo, {user.name}!</h2>
                    </div>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="p-4 rounded-lg shadow-md" style={{ backgroundColor: "#c7d2fe" }}>
                            <h3 className="text-lg font-semibold text-[#175B68]">
                                Total Foto
                            </h3>
                            <p className="text-[#175B68]">{totalImages}</p> {/* Menambahkan warna yang sama dengan judul */}
                        </div>
                        <div className=" p-4 rounded-lg shadow-md"style={{ backgroundColor: "#c7d2fe" }}>
                            <h3 className="text-lg font-semibold text-[#175B68]">Foto yang Di-upload Hari Ini</h3>
                            <p className="text-[#175B68]">{todayImages.length}</p> {/* Menambahkan warna yang sama dengan judul */}
                        </div>
                        <div className=" q p-4 rounded-lg shadow-md"style={{ backgroundColor: "#c7d2fe" }}>
                            <h3 className="text-lg font-semibold text-[#175B68]">Foto Favorit</h3>
                            <p className="text-[#175B68]">{favoriteCount}</p> {/* Menambahkan warna yang sama dengan judul */}
                        </div>
                    </div>


                    <div className="mt-8 flex justify-between items-center">
                        <button
                            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                            onClick={() => document.getElementById("file-input").click()}
                        >
                            Upload Foto
                        </button>

                        <input
                            id="file-input"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>

                    {/* Informasi mengenai ukuran maksimal file */}
                    <div className="mt-4 text-sm text-gray-600">
                        <p>Ukuran maksimal file yang dapat di-upload adalah 2MB.</p>
                        <p>
                            Jika file Anda lebih besar dari 2MB, Anda bisa mengompresnya menggunakan
                            situs berikut:
                            <a href="https://www.ifoto.ai/id/image-compressor?channel=S_Search_compressimg_1126_ID_yue_GG&utm_term=image%20compressor&gad_source=1&gclid=Cj0KCQiA_NC9BhCkARIsABSnSTbOHVPi7kGUG6XkMatJAWwHmzmp9Wv2txxSJgdifIbuEKQETy_NMZYaAuBCEALw_wcB" target="_blank" className="text-blue-500 hover:underline">
                                Compressor
                            </a>
                        </p>
                    </div>

                    {/* Menampilkan gambar yang di-upload hari ini yang sudah difilter berdasarkan pencarian */}
                    <div className="mt-6">
                        <h3 className="text-xl font-medium text-gray-700">Foto yang Di-upload Hari Ini</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                            {filteredTodayImages.map((image) => (
                                <div key={image.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                    <img
                                        src={`/storage/${image.file_path}`}
                                        alt={image.file_name}
                                        className="w-full h-48 object-cover rounded-md"
                                    />
                                    <p className="mt-2 text-gray-600 text-sm">{image.file_name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
