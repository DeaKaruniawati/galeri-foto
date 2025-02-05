<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth; // Pastikan Auth facade diimport
use Inertia\Inertia;

Route::get('/', function () {
    // Mengecek apakah pengguna sudah login atau belum
    if (Auth::check()) { // Gunakan Auth::check() secara eksplisit
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
