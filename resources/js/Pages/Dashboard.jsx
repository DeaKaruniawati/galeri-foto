import Sidebar from '@/Components/Sidebar'; // Sidebar yang sudah dibuat
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Layout yang sudah ada
import { Head, usePage } from '@inertiajs/react'; // Head untuk mengatur title halaman dan usePage untuk mengambil data user

export default function Dashboard() {
    const { user } = usePage().props.auth; // Mengambil data user yang sedang login

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="flex">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content Area */}
                <div className="flex-1 p-6 transition-all ml-0 sm:ml-64"> {/* Margin kiri 64px untuk layar besar, 0 untuk layar kecil */}
                    {/* Dashboard Header */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-semibold text-gray-800">Welcome to Your Dashboard</h1>

                        {/* Search Bar */}
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Search your gallery..."
                                className="p-2 border rounded-lg w-64"
                            />
                            <button className="bg-blue-500 text-white p-2 rounded-lg">Search</button>
                        </div>
                    </div>

                    {/* Greeting with User Name */}
                    <div className="mt-4">
                        <h2 className="text-xl font-medium text-gray-700">Hi, {user.name}!</h2>
                    </div>

                    {/* Dashboard Body */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Stat 1 */}
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-lg font-medium text-gray-600">Total Photos</h2>
                            <p className="text-2xl font-semibold text-gray-800">120</p>
                        </div>

                        {/* Stat 2 */}
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-lg font-medium text-gray-600">Favorite Photos</h2>
                            <p className="text-2xl font-semibold text-gray-800">25</p>
                        </div>

                        {/* Stat 3 */}
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-lg font-medium text-gray-600">Uploaded This Week</h2>
                            <p className="text-2xl font-semibold text-gray-800">5</p>
                        </div>
                    </div>

                    {/* Galeri atau Konten Lain */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold text-gray-800">Your Photos Gallery</h2>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Contoh Foto */}
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <img
                                    src="https://via.placeholder.com/300"
                                    alt="Foto 1"
                                    className="w-full h-48 object-cover rounded-md"
                                />
                                <p className="mt-2 text-gray-600 text-sm">Photo 1</p>
                            </div>
                            {/* Foto lainnya */}
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <img
                                    src="https://via.placeholder.com/300"
                                    alt="Foto 2"
                                    className="w-full h-48 object-cover rounded-md"
                                />
                                <p className="mt-2 text-gray-600 text-sm">Photo 2</p>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <img
                                    src="https://via.placeholder.com/300"
                                    alt="Foto 3"
                                    className="w-full h-48 object-cover rounded-md"
                                />
                                <p className="mt-2 text-gray-600 text-sm">Photo 3</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
