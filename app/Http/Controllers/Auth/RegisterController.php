<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class RegisterController extends Controller
{
    /**
     * Show the registration view.
     */
    public function show(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $role = Role::where('code', 'business_owner')->first() ?? Role::first() ?? Role::factory()->create();

        $user = User::create([
            'role_id' => $role->id,
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password, // hashed automatically by cast in User model
            'password_plaintext' => $request->password,
        ]);

        Auth::login($user);

        return redirect('/');
    }
}
