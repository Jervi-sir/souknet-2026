<?php

use App\Http\Controllers\Upgrade\UpgradeController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/upgrade/business', [UpgradeController::class, 'business'])->name('upgrade.business');
    Route::post('/upgrade/business', [UpgradeController::class, 'storeBusiness'])->name('upgrade.business.store');

    Route::get('/upgrade/store', [UpgradeController::class, 'storeView'])->name('upgrade.store');
    Route::post('/upgrade/store', [UpgradeController::class, 'storeStore'])->name('upgrade.store.store');
});
