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
        $favorites = Favorite::with('image')->where('user_id', Auth::id())->get();
        return response()->json($favorites);
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