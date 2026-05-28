<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\BusinessManagementController;
use App\Http\Controllers\Admin\PaymentHistoryController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Http\Controllers\Admin\CategoryManagementController;

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
});
