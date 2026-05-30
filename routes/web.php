<?php

use App\Http\Controllers\CashierController;
use Illuminate\Support\Facades\Route;

// Webhooks
Route::post('/stripe/webhook', [CashierController::class, 'handleWebhook'])->name('cashier.webhook');

// Owner Dashboard Group
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia\Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/web/admin.php';
require __DIR__.'/web/owner.php';
require __DIR__.'/web/public.php';

require __DIR__.'/settings.php';

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisterController::class, 'show'])->name('register');
    Route::post('register', [RegisterController::class, 'store']);
    Route::get('login', [LoginController::class, 'show'])->name('login');
    Route::post('login', [LoginController::class, 'store']);
});

Route::post('logout', [LoginController::class, 'destroy'])->name('logout');
