<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Photo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PhotoController extends Controller
{
    // Menampilkan halaman untuk upload foto ke album tertentu
    public function create($albumId)
    {
        // Menampilkan halaman upload foto untuk album yang dipilih
        $album = Album::findOrFail($albumId);

        return Inertia::render('UploadPhoto', [
            'album' => $album
        ]);
    }

    // Menyimpan foto yang diunggah ke dalam album
    public function store(Request $request, $albumId)
    {
        // Validasi foto yang diunggah
        $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Aturan validasi untuk foto
        ]);

        // Cari album berdasarkan ID
        $album = Album::findOrFail($albumId); // Pastikan album ada

        $file = $request->file('photo');

        // Menyimpan foto ke album
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('photos', 'public'); // Menyimpan file foto

            // Menyimpan informasi foto ke dalam database
            $photo = Photo::create([
                'album_id' => $album->id,
                'path' => $photoPath, // Path file foto
                'file_size' => $file->getSize()
            ]);
        }

        // Mengarahkan kembali ke album setelah foto berhasil diunggah
        return response()->json([
            'message' => 'Photo uploaded successfully!',
            'photo' => $photo
        ]);
    }

    public function destroy($id)
    {
        $photo = Photo::findOrFail($id);
        // Delete the file from storage
        Storage::disk('public')->delete($photo->path);

        // Delete from the database
        $photo->delete();

        return response()->json(['message' => 'Photo deleted successfully']);
    }
}

