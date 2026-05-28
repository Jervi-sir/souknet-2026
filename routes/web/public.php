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

// Public Data Enrichment
Route::get('/data-enrichment', function () {
    return Inertia\Inertia::render('public/data-enrichment/page');
})->name('data-enrichment');

// Public Saved Emails
Route::get('/emails', function () {
    return Inertia\Inertia::render('public/emails/page');
})->name('emails');

// Public Products
Route::get('/products', function () {
    return Inertia\Inertia::render('public/products/page');
})->name('products');

// Public Jobs
Route::get('/jobs', function () {
    return Inertia\Inertia::render('public/jobs/page');
})->name('jobs');
