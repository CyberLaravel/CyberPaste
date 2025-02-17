<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PasteController;
use App\Http\Controllers\PasteVerificationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Paste;

Route::get('/', function () {
    $recentPastes = Paste::whereNull('password')
        ->whereNull('expires_at')
        ->orWhere('expires_at', '>', now())
        ->latest()
        ->take(5)
        ->get()
        ->map(fn($paste) => [
            'slug' => $paste->slug,
            'title' => $paste->title,
            'created_at' => $paste->created_at
        ]);

    return Inertia::render('Welcome', [
        'recentPastes' => $recentPastes,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/pastes/create', [PasteController::class, 'create'])->name('pastes.create');
Route::post('/pastes', [PasteController::class, 'store'])->name('pastes.store');
Route::get('/pastes/{slug}', [PasteController::class, 'show'])->name('pastes.show');

Route::middleware('web')->group(function () {
    Route::post('/api/pastes/{slug}/verify', [PasteVerificationController::class, 'verify'])
        ->name('pastes.verify');

    Route::get('/api/pastes/{slug}/content', [PasteController::class, 'getContent'])
        ->middleware('auth')
        ->name('pastes.content');
});

require __DIR__ . '/auth.php';
