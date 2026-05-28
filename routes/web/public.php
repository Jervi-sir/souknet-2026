<?php

use App\Http\Controllers\Public\CategoryController;
use App\Http\Controllers\Public\DirectoryController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\PricingController;
use App\Http\Controllers\Public\SearchController;
use Illuminate\Support\Facades\Route;

// Public Home
Route::get('/', [HomeController::class, 'index'])->name('home');

// Public Directory
Route::get('/directory', [DirectoryController::class, 'index'])->name('directory.index');
Route::get('/directory/{slug}', [DirectoryController::class, 'show'])->name('directory.show');

// Public Category
Route::get('/category/{code}', [CategoryController::class, 'show'])->name('category.show');

// Public Pricing
Route::get('/pricing', [PricingController::class, 'index'])->name('pricing.index');

// Public Search
Route::get('/search', [SearchController::class, 'index'])->name('search.index');
