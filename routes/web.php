<?php

use App\Http\Controllers\ImageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\PhotoController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

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
Route::get('/album', [AlbumController::class, 'index'])->middleware(['auth', 'verified'])->name('album');

// Rute untuk membuat album
Route::post('/albums', [AlbumController::class, 'store'])->middleware(['auth', 'verified'])->name('albums.store');

// Menampilkan album
Route::get('/albums/{id}', [AlbumController::class, 'show'])->middleware(['auth', 'verified'])->name('albums.show');

// Foto upload ke album
Route::get('albums/{albumId}/photos/create', [PhotoController::class, 'create'])->middleware(['auth', 'verified'])->name('photos.create');
// Menyimpan foto ke album tertentu
Route::post('/albums/{albumId}/photos', [PhotoController::class, 'store'])->name('photos.store');
Route::get('storage/{filename}', function ($filename) {
    return Storage::download('public/photos/' . $filename);
});

// Menampilkan foto
Route::get('photos/{id}', [PhotoController::class, 'show'])->middleware(['auth', 'verified'])->name('photos.show');

// Menghapus foto
Route::delete('photos/{id}', [PhotoController::class, 'destroy'])->middleware(['auth', 'verified'])->name('photos.destroy');

// Route untuk halaman Favorit
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
