<?php

use App\Http\Controllers\ImageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth; // Pastikan Auth facade diimport
use Inertia\Inertia;

Route::get('/', function () {
    // Mengecek apakah pengguna sudah login atau belum
    if (Auth::check()) {
        // Jika sudah login, arahkan ke dashboard
        return redirect()->route('dashboard');
    }

    // Jika belum login dan registrasi diaktifkan, arahkan ke halaman register
    if (Route::has('register')) {
        return redirect()->route('register');
    }

    // Jika tidak ada halaman register, arahkan ke halaman login
    return redirect()->route('login');
});

// Menangani upload gambar
Route::post('/upload-image', [ImageController::class, 'uploadImage']);

// Menangani mengambil data gambar
Route::get('/get-image', [ImageController::class, 'getImage'])->name('image.get');

Route::get('/get-image', [ImageController::class, 'getImage']);


// Route untuk Dashboard
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Route untuk Gallery
Route::get('/gallery', function () {
    return Inertia::render('Gallery');
})->middleware(['auth', 'verified'])->name('gallery');

Route::post('/file-upload',[ImageController::class,'store'])->middleware(["auth","verified"])->name("file.upload.store");

//Route untuk Album
Route::get('/album', function (){
    return Inertia::render('Album');
})->middleware(['auth', 'verified'])->name('album');

//Route untuk Favorit 
Route::get('/favorit', function () {
    return Inertia::render('Favorit');
})->middleware(['auth', 'verified'])->name('favorit');

// Profil Route
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

