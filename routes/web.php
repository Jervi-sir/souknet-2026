<?php

use App\Http\Controllers\Public\CategoryController;
use App\Http\Controllers\Public\DirectoryController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\PricingController;
use App\Http\Controllers\Public\SearchController;
use Illuminate\Support\Facades\Route;


// Webhooks
Route::post('/stripe/webhook', [\App\Http\Controllers\CashierController::class, 'handleWebhook'])->name('cashier.webhook');

// Owner Dashboard Group
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia\Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/web/admin.php';
require __DIR__ . '/web/owner.php';
require __DIR__ . '/web/public.php';

require __DIR__ . '/settings.php';
