<?php

use App\Http\Controllers\ImageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\AlbumController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth; // Pastikan Auth facade diimport
use Inertia\Inertia;

// Menangani Halaman Utama
Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('dashboard');
    }

    if (Route::has('register')) {
        return redirect()->route('register');
    }

    return redirect()->route('login');
});

// Grouping image-related routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/file-upload', [ImageController::class, 'store'])->name('file.upload.store');
    Route::get('/images', [ImageController::class, 'index'])->name('images.index');
    Route::get('/images/today', [ImageController::class, 'today'])->name('images.today');
    Route::get('/images/favorites', [ImageController::class, 'getFavoriteImages'])->name('images.favorites');
    Route::put('/images/{id}', [ImageController::class, 'update'])->name('images.update');
    Route::delete('/images/{id}', [ImageController::class, 'destroy'])->name('images.destroy');
});

// Route untuk Dashboard
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Route untuk Gallery
Route::get('/gallery', function () {
    return Inertia::render('Gallery');
})->middleware(['auth', 'verified'])->name('gallery');

// Route untuk Album
Route::get('/album', function () {
    return Inertia::render('Album');
})->middleware(['auth', 'verified'])->name('album');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/albums', [AlbumController::class, 'index'])->name('albums.index');
    Route::post('/albums', [AlbumController::class, 'store'])->name('albums.store');
    Route::post('/albums/{album}/images', [AlbumController::class, 'storeImage'])->name('albums.storeImage');
});


// Route untuk halaman Favorit (hanya perlu middleware 'auth' jika pengguna harus login)
Route::get('/favorit', function () {
    return Inertia::render('Favorit');
})->middleware(['auth', 'verified'])->name('favorit');

// Grup route dengan middleware 'auth'
Route::middleware(['auth'])->group(function () {
    // Menyimpan gambar ke favorit
    Route::post('/favorites', [FavoriteController::class, 'store'])->name('favorites.store');

    // Menghapus gambar dari favorit
    Route::delete('/favorites/{id}', [FavoriteController::class, 'destroy'])->name('favorites.destroy');

    // Menampilkan daftar gambar favorit
    Route::get('/favorites', [FavoriteController::class, 'index'])->name('favorites.index');
});

// Profil Route
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Menyertakan route untuk autentikasi
require __DIR__.'/auth.php';