<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\BusinessManagementController;
use App\Http\Controllers\Admin\CategoryManagementController;
use App\Http\Controllers\Admin\PaymentHistoryController;
use App\Http\Controllers\Admin\PlanManagementController;
use App\Http\Controllers\Admin\ReviewManagementController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\UserManagementController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('/admin', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/businesses', [BusinessManagementController::class, 'index'])->name('admin.businesses');
    Route::patch('/admin/businesses/{id}/approve', [BusinessManagementController::class, 'approve'])->name('admin.businesses.approve');
    Route::patch('/admin/businesses/{id}/reject', [BusinessManagementController::class, 'reject'])->name('admin.businesses.reject');
    Route::delete('/admin/businesses/{id}', [BusinessManagementController::class, 'destroy'])->name('admin.businesses.destroy');

    // Admin Payments Group
    Route::get('/admin/payments', [PaymentHistoryController::class, 'index'])->name('admin.payments');

    // Admin Users Group
    Route::get('/admin/users', [UserManagementController::class, 'index'])->name('admin.users');
    Route::patch('/admin/users/{id}/role', [UserManagementController::class, 'updateRole'])->name('admin.users.role');
    Route::delete('/admin/users/{id}', [UserManagementController::class, 'destroy'])->name('admin.users.destroy');

    // Admin Categories Group
    Route::get('/admin/categories', [CategoryManagementController::class, 'index'])->name('admin.categories');
    Route::post('/admin/categories', [CategoryManagementController::class, 'store'])->name('admin.categories.store');
    Route::patch('/admin/categories/{id}', [CategoryManagementController::class, 'update'])->name('admin.categories.update');
    Route::delete('/admin/categories/{id}', [CategoryManagementController::class, 'destroy'])->name('admin.categories.destroy');

    // Admin Settings Group
    Route::get('/admin/settings', [SettingController::class, 'index'])->name('admin.settings.index');
    Route::post('/admin/settings', [SettingController::class, 'update'])->name('admin.settings.update');

    // Admin Reviews Group
    Route::get('/admin/reviews', [ReviewManagementController::class, 'index'])->name('admin.reviews.index');
    Route::delete('/admin/reviews/{id}', [ReviewManagementController::class, 'destroy'])->name('admin.reviews.destroy');

    // Admin Plans Group
    Route::get('/admin/plans', [PlanManagementController::class, 'index'])->name('admin.plans');
    Route::post('/admin/plans', [PlanManagementController::class, 'store'])->name('admin.plans.store');
    Route::patch('/admin/plans/{id}', [PlanManagementController::class, 'update'])->name('admin.plans.update');
});
