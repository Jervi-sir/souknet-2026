<?php

use App\Http\Controllers\Public\CategoryController;
use App\Http\Controllers\Public\DirectoryController;
use App\Http\Controllers\Public\Discover\DiscoverCompaniesController;
use App\Http\Controllers\Public\Discover\DiscoverDataEnrichmentController;
use App\Http\Controllers\Public\Discover\DiscoverJobsController;
use App\Http\Controllers\Public\Discover\DiscoverPeopleController;
use App\Http\Controllers\Public\Discover\DiscoverProductsController;
use App\Http\Controllers\Public\Engage\EngageEmailController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\Inbound\InboundFormsController;
use App\Http\Controllers\Public\Inbound\InboundWebsiteVisitorsController;
use App\Http\Controllers\Public\PricingController;
use App\Http\Controllers\Public\SavedRecords\SavedCompaniesController;
use App\Http\Controllers\Public\SavedRecords\SavedJobsController;
use App\Http\Controllers\Public\SavedRecords\SavedPeopleController;
use App\Http\Controllers\Public\SavedRecords\SavedProductsController;
use App\Http\Controllers\Public\SearchController;
use App\Http\Controllers\Public\StorefrontController;
use App\Http\Controllers\Public\ToolsAutomations\ToolsAutomationsAnalyticsController;
use App\Http\Controllers\Public\ToolsAutomations\ToolsAutomationsWorkflowsController;
use App\Http\Controllers\Public\WinDeals\ConversationsController;
use App\Http\Controllers\Public\WinDeals\DealsController;
use App\Http\Controllers\Public\WinDeals\MeetingsController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/directory', [DirectoryController::class, 'index'])->name('directory.index');
Route::get('/directory/{slug}', [DirectoryController::class, 'show'])->name('directory.show');
Route::get('/category/{code}', [CategoryController::class, 'show'])->name('category.show');
Route::get('/pricing', [PricingController::class, 'index'])->name('pricing.index');
Route::get('/search', [SearchController::class, 'index'])->name('search.index');

Route::prefix('discover')->group(function () {
    Route::get('products', DiscoverProductsController::class)->name('products.index');
    Route::get('jobs', DiscoverJobsController::class)->name('jobs.index');
    Route::get('people', DiscoverPeopleController::class)->name('people.index');
    Route::get('companies', DiscoverCompaniesController::class)->name('companies.index');
    Route::get('data-enrichment', DiscoverDataEnrichmentController::class)->name('data-enrichment');
});

Route::prefix('engage')->group(function () {
    Route::get('emails', EngageEmailController::class)->name('emails');
});

Route::prefix('win-deals')->group(function () {
    Route::get('conversations', ConversationsController::class)->name('conversations');
    Route::get('deals', DealsController::class)->name('deals');
    Route::get('meetings', MeetingsController::class)->name('meetings');
});

Route::prefix('tools-automations')->group(function () {
    Route::get('workflows', ToolsAutomationsWorkflowsController::class)->name('workflows');
    Route::get('analytics', ToolsAutomationsAnalyticsController::class)->name('analytics');
});

Route::prefix('inbound')->group(function () {
    Route::get('website-visitors', InboundWebsiteVisitorsController::class)->name('website-visitors');
    Route::get('forms', InboundFormsController::class)->name('forms');
});

Route::prefix('saved-records')->group(function () {
    Route::get('saved-products', [SavedProductsController::class, 'saved'])->name('products.saved')->middleware('auth');
    Route::get('saved-jobs', [SavedJobsController::class, 'saved'])->name('jobs.saved')->middleware('auth');
    Route::get('saved-people', [SavedPeopleController::class, 'saved'])->name('people.saved')->middleware('auth');
    Route::get('saved-companies', [SavedCompaniesController::class, 'saved'])->name('companies.saved')->middleware('auth');

    Route::post('products/{product}/save', [SavedProductsController::class, 'toggleSave'])->name('products.save');
    Route::post('products/save-multiple', [SavedProductsController::class, 'toggleSaveMultiple'])->name('products.save-multiple');
    Route::post('jobs/{job}/save', [SavedJobsController::class, 'toggleSave'])->name('jobs.save');
    Route::post('jobs/save-multiple', [SavedJobsController::class, 'toggleSaveMultiple'])->name('jobs.save-multiple');
    Route::post('people/{person}/save', [SavedPeopleController::class, 'toggleSave'])->name('people.save');
    Route::post('people/save-multiple', [SavedPeopleController::class, 'toggleSaveMultiple'])->name('people.save-multiple');
    Route::post('companies/{business}/save', [SavedCompaniesController::class, 'toggleSave'])->name('companies.save');
    Route::post('companies/save-multiple', [SavedCompaniesController::class, 'toggleSaveMultiple'])->name('companies.save-multiple');
});

Route::get('/store/{slug}', [StorefrontController::class, 'show'])->name('public.store.show');
Route::get('/store/{slug}/products/{productSlug}', [StorefrontController::class, 'product'])->name('public.store.product');
