<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AlbumController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    // Menyimpan album baru
    public function store(Request $request)
    {
        // Validasi data album
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Simpan album baru
        $album = new Album();
        $album->title = $request->title;
        $album->description = $request->description;
        $album->user_id = Auth::id(); // Menyimpan id pengguna yang membuat album
        $album->save();

        // Mengarahkan kembali setelah album berhasil dibuat
        return redirect()->route('albums.index')->with('success', 'Album berhasil dibuat!');
    }
}
