<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


use Illuminate\Support\Facades\Auth;

class AlbumController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');  // Pastikan pengguna sudah terautentikasi
    }

    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Create the album
        $album = Album::create([
            'title' => $request->title,
            'description' => $request->description,
            'user_id' => Auth::id(), // Assign to the logged-in user
        ]);

        return response()->json([
            'message' => 'Album created successfully!',
            'album' => $album,
        ]);
    }

    public function index()
    {
        $albums = Album::where('user_id', Auth::id())->with('photos')->get(); // Pastikan Auth::id() mengembalikan ID pengguna yang login
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

    public function destroy($id)
    {
        $album = Album::find($id);

        if (!$album) {
            return response()->json(['error' => 'Album not found'], 404);
        }

        // Delete album and its photos
        foreach ($album->photos as $photo) {
            $filePath = 'photos/' . basename($photo->path);
            Storage::disk('public')->delete($filePath); // Delete from storage
            $photo->delete(); // Delete from DB
        }
        $album->delete();

        return response()->json(['message' => 'Album deleted successfully']);
    }
}

