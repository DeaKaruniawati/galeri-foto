<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;

use App\Models\Album;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AlbumController extends Controller
{
    // Menampilkan semua album milik user
    public function index()
    {
        // Ambil semua album milik user yang login
        $albums = Album::where('user_id', auth()->id())->get();

        // Mengirim data album ke tampilan
        return Inertia::render('Album', [
            'albums' => $albums, // Pastikan data album dikirim ke tampilan
        ]);
    }

    // Membuat album baru
    public function store(Request $request)
    {
        // Validasi data
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
        ]);

        // Simpan album baru
        $album = Album::create([
            'title' => $request->title,
            'description' => $request->description,
            'user_id' => auth()->id(), // Simpan dengan user yang login
        ]);

        // Kembalikan respons atau rute
        return redirect()->route('album')->with('success', 'Album created successfully!');
    }

    public function showAlbum($albumId)
    {
        // Ambil album bersama foto-fotonya
        $album = Album::with('photos')->findOrFail($albumId);
    
        // Memastikan URL foto valid dan dapat diakses secara publik
        $album->photos->each(function($photo) {
            // Cek apakah foto memiliki path yang benar di storage
            $photo->url = Storage::url($photo->url);  // Ganti 'path' dengan nama kolom yang benar
        });
    
        // Return data album ke Inertia
        return Inertia::render('AlbumShow', [
            'album' => $album
        ]);
    }
    
}
