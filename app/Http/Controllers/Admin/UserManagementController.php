<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserManagementController extends Controller
{
    /**
     * Display a listing of users.
     */
    public function index(Request $request): Response
    {
        $query = User::with('roles')
            ->withCount(['businesses', 'reviews']);

        // Apply Search
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Apply Role Filter
        if ($request->filled('role')) {
            $roleFilter = $request->input('role');
            if ($roleFilter !== 'all') {
                $query->whereHas('roles', function ($rq) use ($roleFilter) {
                    $rq->where('code', $roleFilter);
                });
            }
        }

        // Apply Sorting
        $sort = $request->input('sort', 'newest');
        if ($sort === 'name_asc') {
            $query->orderBy('name', 'asc');
        } elseif ($sort === 'name_desc') {
            $query->orderBy('name', 'desc');
        } elseif ($sort === 'oldest') {
            $query->orderBy('created_at', 'asc');
        } else {
            $query->orderBy('created_at', 'desc'); // newest
        }

        $users = $query->paginate(15)->withQueryString();
        $roles = Role::orderBy('en')->get();

        return Inertia::render('admin/user-management/page', [
            'users' => $users,
            'roles' => $roles,
            'filters' => [
                'search' => $request->input('search', ''),
                'role' => $request->input('role', 'all'),
                'sort' => $sort,
            ],
        ]);
    }

    /**
     * Update the user's role.
     */
    public function updateRole(Request $request, int $id): RedirectResponse
    {
        $currentUser = $request->user();
        if ($currentUser->id === $id) {
            return back()->withErrors(['error' => 'You cannot change your own role.']);
        }

        $user = User::findOrFail($id);

        $validated = $request->validate([
            'role_id' => 'required|exists:roles,id',
        ]);

        $user->update([
            'role_id' => $validated['role_id'],
        ]);

        $role = Role::findOrFail($validated['role_id']);

        return back()->with('success', "User '{$user->name}' has been reassigned to the {$role->en} role.");
    }

    /**
     * Delete the user.
     */
    public function destroy(Request $request, int $id): RedirectResponse
    {
        $currentUser = $request->user();
        if ($currentUser->id === $id) {
            return back()->withErrors(['error' => 'You cannot delete your own account.']);
        }

        $user = User::findOrFail($id);
        $user->delete();

        return back()->with('success', "User '{$user->name}' deleted successfully.");
    }
}
