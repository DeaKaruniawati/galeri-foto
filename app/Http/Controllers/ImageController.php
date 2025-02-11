<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;

class ImageController extends Controller
{
    // Fungsi untuk meng-upload gambar
    public function uploadImage(Request $request)
{
    // Validasi gambar
    $request->validate([
        'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    // Ambil gambar yang dipilih
    $image = $request->file('image');
    
    // Simpan gambar di folder 'images' dengan driver 'public'
    $imagePath = $image->store('images', 'public');
    
    // Simpan data gambar ke database
    $imageRecord = new Image();
    $imageRecord->file_name = $image->getClientOriginalName();  // Nama asli file
    $imageRecord->file_size = $image->getSize();  // Ukuran file gambar
    $imageRecord->file_type = $image->getClientMimeType();  // Tipe file gambar
    $imageRecord->file_path = $imagePath;  // Path gambar di storage
    $imageRecord->uploaded_at = now();  // Waktu upload
    $imageRecord->save();  // Simpan ke database

    // Mengembalikan respon setelah upload berhasil
    return response()->json(['message' => 'Image uploaded successfully!']);
}
public function getImages()
{
    // Ambil semua gambar dari database
    $images = Image::all();

    // Mengembalikan data gambar dalam format JSON
    return response()->json($images);
}


}


