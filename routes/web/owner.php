<?php

use App\Http\Controllers\Owner\BusinessController;
use App\Http\Controllers\Owner\LeadsManagementController;
use App\Http\Controllers\Owner\OwnerDashboardController;
use App\Http\Controllers\Owner\OwnerJobController;
use App\Http\Controllers\Owner\OwnerPeopleController;
use App\Http\Controllers\Owner\ReviewsManagementController;
use App\Http\Controllers\Owner\SettingsController;
use App\Http\Controllers\Owner\SubscriptionBillingController;
use Illuminate\Support\Facades\Route;

Route::prefix('owner')->middleware(['auth', 'verified'])->group(function () {
    // 1. Dashboard Route
    Route::get('dashboard', [OwnerDashboardController::class, 'index'])->name('owner.dashboard');

    // 2. Listings Management Routes (Grouped)
    Route::prefix('listings')->group(function () {
        Route::get('/', [BusinessController::class, 'index'])->name('owner.listings.index');
        Route::get('create', [BusinessController::class, 'create'])->name('owner.listings.create');
        Route::post('/', [BusinessController::class, 'store'])->name('owner.listings.store');
        Route::get('{id}', [BusinessController::class, 'show'])->name('owner.listings.show');
        Route::get('{id}/edit', [BusinessController::class, 'edit'])->name('owner.listings.edit');
        Route::put('{id}', [BusinessController::class, 'update'])->name('owner.listings.update');
        Route::delete('{id}', [BusinessController::class, 'destroy'])->name('owner.listings.destroy');
    });

    // 3. Leads & Messages Routes (Grouped)
    Route::prefix('leads')->group(function () {
        Route::get('/', [LeadsManagementController::class, 'index'])->name('owner.leads');
        Route::post('{id}/read', [LeadsManagementController::class, 'markAsRead'])->name('owner.leads.read');
    });

    // 4. Customer Reviews Routes (Grouped)
    Route::prefix('reviews')->group(function () {
        Route::get('/', [ReviewsManagementController::class, 'index'])->name('owner.reviews');
        Route::post('{id}/reply', [ReviewsManagementController::class, 'reply'])->name('owner.reviews.reply');
    });

    // 5. Subscription & Billing Routes (Grouped)
    Route::prefix('subscription-billing')->group(function () {
        Route::get('/', [SubscriptionBillingController::class, 'index'])->name('owner.subscription-billing.index');
        Route::post('{businessId}/upgrade', [SubscriptionBillingController::class, 'upgrade'])->name('owner.subscription-billing.upgrade');
    });

    // 6. Settings Routes (Grouped)
    Route::prefix('settings')->group(function () {
        Route::get('/', [SettingsController::class, 'index'])->name('owner.settings');
        Route::post('/', [SettingsController::class, 'update'])->name('owner.settings.update');
    });

    // 7. Jobs Management Routes (Grouped)
    Route::prefix('jobs')->group(function () {
        Route::get('/', [OwnerJobController::class, 'index'])->name('owner.jobs.index');
        Route::post('/', [OwnerJobController::class, 'store'])->name('owner.jobs.store');
        Route::get('{id}', [OwnerJobController::class, 'show'])->name('owner.jobs.show');
        Route::put('{id}', [OwnerJobController::class, 'update'])->name('owner.jobs.update');
        Route::delete('{id}', [OwnerJobController::class, 'destroy'])->name('owner.jobs.destroy');
    });

    // 8. People Management Routes (Grouped)
    Route::prefix('people')->group(function () {
        Route::get('/', [OwnerPeopleController::class, 'index'])->name('owner.people.index');
        Route::post('/', [OwnerPeopleController::class, 'store'])->name('owner.people.store');
        Route::get('{id}', [OwnerPeopleController::class, 'show'])->name('owner.people.show');
        Route::put('{id}', [OwnerPeopleController::class, 'update'])->name('owner.people.update');
        Route::delete('{id}', [OwnerPeopleController::class, 'destroy'])->name('owner.people.destroy');
    });
});
