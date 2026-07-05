<?php

use App\Http\Controllers\CashierController;
use Illuminate\Support\Facades\Route;

// Webhooks
Route::post('stripe/webhook', [CashierController::class, 'handleWebhook'])->name('cashier.webhook');

// Owner Dashboard Group
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia\Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/web/auth.php';
require __DIR__.'/web/admin.php';
require __DIR__.'/web/owner.php';
require __DIR__.'/web/stores.php';
require __DIR__.'/web/public.php';
require __DIR__.'/web/upgrade.php';

require __DIR__.'/settings.php';
