<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'image_id' => 'required|exists:images,id',
        ]);

        // Simpan gambar ke favorit
        Favorite::create([
            'user_id' => Auth::id(),
            'image_id' => $request->image_id,
        ]);

        return response()->json(['message' => 'Image added to favorites']);
    }

    public function index()
    {
        try {
            // Ambil semua gambar favorit yang dimiliki oleh user yang sedang login
            $favorites = Favorite::with('image')->where('user_id', Auth::id())->get();
    
            // Hitung jumlah favorit yang dimiliki oleh user
            $favoriteCount = $favorites->count();
    
            // Jika data favorit tidak ada
            if ($favorites->isEmpty()) {
                return response()->json([
                    'favoriteCount' => 0,
                    'favorites' => [],
                    'message' => 'No favorites found',
                ]);
            }
    
            // Mengembalikan response JSON dengan data favorit dan jumlah favorit
            return response()->json([
                'favoriteCount' => $favoriteCount,
                'favorites' => $favorites,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Internal Server Error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
    
    public function destroy($id)
    {
        $favorite = Favorite::where('user_id', Auth::id())->where('image_id', $id)->first();
        if ($favorite) {
            $favorite->delete();
            return response()->json(['message' => 'Image removed from favorites']);
        }

        return response()->json(['message' => 'Favorite not found'], 404);
    }
}