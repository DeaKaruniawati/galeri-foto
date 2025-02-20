<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AlbumController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');  // Pastikan pengguna sudah terautentikasi
    }

    // Menampilkan semua album milik user
    public function index()
    {
        $albums = Album::where('user_id', Auth::id())->get(); // Pastikan Auth::id() mengembalikan ID pengguna yang login
        return Inertia::render('Album', [
            'albums' => $albums,
        ]);
    }

    public function showAlbum($albumId)
    {
        $album = Album::with('photos')->findOrFail($albumId);
        $album->photos->each(function($photo) {
            $photo->url = Storage::url($photo->url);  // Ganti 'path' dengan nama kolom yang benar
        });

        return Inertia::render('AlbumShow', [
            'album' => $album
        ]);
    }
}

