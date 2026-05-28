<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Owner\OwnerDashboardController;
use App\Http\Controllers\Owner\LeadsManagementController;
use App\Http\Controllers\Owner\BusinessController;
use App\Http\Controllers\Owner\ReviewsManagementController;
use App\Http\Controllers\Owner\SubscriptionBillingController;
use App\Http\Controllers\Owner\SettingsController;

Route::prefix('owner')->middleware(['auth', 'verified'])->group(function () {
  Route::get('dashboard', [OwnerDashboardController::class, 'index'])->name('owner.dashboard');

  // Owner Leads Group
  Route::get('leads', [LeadsManagementController::class, 'index'])->name('owner.leads');
  Route::post('leads/{id}/read', [LeadsManagementController::class, 'markAsRead'])->name('owner.leads.read');

  // Owner Businesses Group
  Route::get('businesses/create', [BusinessController::class, 'create'])->name('owner.businesses.create');
  Route::post('businesses', [BusinessController::class, 'store'])->name('owner.businesses.store');
  Route::get('businesses/{id}/edit', [BusinessController::class, 'edit'])->name('owner.businesses.edit');
  Route::put('businesses/{id}', [BusinessController::class, 'update'])->name('owner.businesses.update');

  // Owner Reviews Group
  Route::get('reviews', [ReviewsManagementController::class, 'index'])->name('owner.reviews');
  Route::post('reviews/{id}/reply', [ReviewsManagementController::class, 'reply'])->name('owner.reviews.reply');

  // Owner Subscription & Billing Group
  Route::get('subscription-billing', [SubscriptionBillingController::class, 'index'])->name('owner.subscription-billing');
  Route::post('subscription-billing/{businessId}/upgrade', [SubscriptionBillingController::class, 'upgrade'])->name('owner.subscription-billing.upgrade');

  // Owner Settings Group
  Route::get('settings', [SettingsController::class, 'index'])->name('owner.settings');
  Route::post('settings', [SettingsController::class, 'update'])->name('owner.settings.update');
});
