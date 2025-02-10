<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class ImageController extends Controller
{
    public function __construct()
    {
        // Pastikan hanya user yang sudah login yang bisa mengupload gambar
        // $this->middleware('auth');
    }

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

        $filename = time() . '.' . $file->getClientOriginalExtension();

        $path = $file->storeAs('images', $filename, ["disk" => "public"]);

        $image = new Image();
        $image->filename = $filename;
        $image->file_path = $path;
        $image->file_type = $file->getMimeType();
        $image->file_size = $file->getSize();
        $image->user_id = Auth::id();
        $image->save();

        // Kembali ke halaman gallery dengan pesan sukses
        return redirect()->route('gallery')->with('success', 'Image uploaded successfully!');
    }

    // Menampilkan gambar yang telah di-upload (misalnya gallery)
    public function index()
    {
        $images = Image::where('user_id', Auth::id())->get(); // Menampilkan hanya gambar milik user yang sedang login
        return view('images.index', compact('images'));
    }
}
