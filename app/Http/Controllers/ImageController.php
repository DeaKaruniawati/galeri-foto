<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;
use Illuminate\Support\Facades\Auth;

class ImageController extends Controller
{
    // Pastikan kita mengaktifkan middleware dengan benar di sini
    // public function __construct()
    // {
    //     // Middleware 'auth' memastikan hanya pengguna yang sudah login yang dapat mengakses controller ini
    //     $this->middleware('auth');
    // }

    // Menampilkan form untuk upload gambar
    public function create()
    {
        return view('images.create');
    }

    // Menangani upload gambar
    public function store(Request $request)
    {
        // Validasi file yang di-upload
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $file = $request->file('image');

        // Generate nama file baru berdasarkan waktu untuk menghindari duplikasi nama
        $filename = time() . '.' . $file->getClientOriginalExtension();

        // Menyimpan file gambar ke storage 'public'
        $path = $file->storeAs('images', $filename, ['disk' => 'public']);

        // Simpan informasi gambar ke database
        $image = new Image();
        $image->file_name = $filename; // Pastikan ini sesuai dengan kolom di database
        $image->file_size = $file->getSize();
        $image->file_type = $file->getMimeType();
        $image->file_path = $path;
        $image->save();

        // Kembali ke halaman gallery dengan pesan sukses
        return response()->json([
            'success' => true,
            'message' => 'Image uploaded successfully!',
            'image' => $image
        ]);
    }
    public function index()
{
    // Ambil semua gambar dari database
    $images = Image::all(); // Jika Anda ingin mengambil gambar berdasarkan pengguna, gunakan Auth::id()
    return response()->json($images); // Mengembalikan data gambar dalam format JSON
}

public function today()
{
    $todayCount = Image::whereDate('created_at', today())->count();
    return response()->json(['count' => $todayCount]);
}


public function update(Request $request, $id)
{
    // Validasi input
    $request->validate([
        'file_name' => 'required|string|max:255',
    ]);

    try {
        // Temukan gambar berdasarkan ID
        $image = Image::findOrFail($id);

        // Ambil path file saat ini
        $currentFilePath = public_path('storage/images/' . $image->file_name);

        // Tentukan nama file baru
        $newFileName = $request->file_name;
        $newFilePath = public_path('storage/images/' . $newFileName);

        // Cek apakah file dengan nama baru sudah ada
        if (file_exists($newFilePath)) {
            return response()->json([
                'success' => false,
                'message' => 'File with the new name already exists.'
            ], 400);
        }

        // Ganti nama file di sistem file
        rename($currentFilePath, $newFilePath);

        // Perbarui nama file di database
        $image->file_name = $newFileName;
        $image->save();

        return response()->json([
            'success' => true,
            'message' => 'File renamed successfully!'
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Error renaming file: ' . $e->getMessage()
        ], 500);
    }
}

public function destroy($id)
{
    // Temukan gambar berdasarkan ID
    $image = Image::findOrFail($id);

    // Tentukan path file yang akan dihapus
    $filePath = public_path('storage/images/' . $image->file_name);

    // Cek apakah file ada sebelum menghapus
    if (file_exists($filePath)) {
        // Hapus file dari sistem file
        unlink($filePath);
    }

    // Hapus record dari database
    $image->delete();

    return response()->json([
        'success' => true,
        'message' => 'Image deleted successfully!'
    ]);
}



    // Menampilkan gambar yang telah di-upload (misalnya gallery)
    // public function index()
    // {
    //     // Ambil gambar-gambar milik pengguna yang sedang login
    //     $images = Image::where('user_id', Auth::id())->get();
    //     return view('images.index', compact('images'));
    // }
}
