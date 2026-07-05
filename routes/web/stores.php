<?php

use App\Http\Controllers\Owner\StoreController;
use App\Http\Controllers\Owner\StoreProductController;
use Illuminate\Support\Facades\Route;

Route::prefix('stores')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [StoreController::class, 'index'])->name('stores.index');
    Route::get('create', [StoreController::class, 'create'])->name('stores.create');
    Route::post('/', [StoreController::class, 'store'])->name('stores.store');
    Route::get('{id}', [StoreController::class, 'show'])->name('stores.show');
    Route::get('{id}/customize', [StoreController::class, 'customize'])->name('stores.customize');
    Route::post('{id}/customize', [StoreController::class, 'saveCustomize'])->name('stores.save-customize');
    Route::get('{storeId}/products/create', [StoreProductController::class, 'create'])->name('stores.products.create');
    Route::post('{storeId}/products', [StoreProductController::class, 'store'])->name('stores.products.store');
});
