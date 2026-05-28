<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryManagementController extends Controller
{
    /**
     * Display a listing of categories.
     */
    public function index(Request $request): Response
    {
        $query = Category::withCount('businesses');

        // Apply Search
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('code', 'like', "%{$search}%")
                    ->orWhere('en', 'like', "%{$search}%")
                    ->orWhere('fr', 'like', "%{$search}%")
                    ->orWhere('ar', 'like', "%{$search}%");
            });
        }

        // Apply Sorting
        $sort = $request->input('sort', 'order_asc');
        if ($sort === 'order_desc') {
            $query->orderBy('sort_order', 'desc');
        } elseif ($sort === 'name_asc') {
            $query->orderBy('en', 'asc');
        } elseif ($sort === 'name_desc') {
            $query->orderBy('en', 'desc');
        } else {
            $query->orderBy('sort_order', 'asc'); // default order_asc
        }

        $categories = $query->paginate(15)->withQueryString();

        return Inertia::render('admin/category-management/page', [
            'categories' => $categories,
            'filters' => [
                'search' => $request->input('search', ''),
                'sort' => $sort,
            ],
        ]);
    }

    /**
     * Store a newly created category.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'code' => 'required|string|max:100|unique:categories,code',
            'en' => 'required|string|max:255',
            'fr' => 'nullable|string|max:255',
            'ar' => 'nullable|string|max:255',
            'icon' => 'nullable|string|max:255',
            'hex_color' => 'nullable|string|max:50',
            'sort_order' => 'required|integer|min:0',
        ]);

        Category::create($validated);

        return back()->with('success', "Category '{$validated['en']}' created successfully!");
    }

    /**
     * Update the specified category.
     */
    public function update(Request $request, int $id): RedirectResponse
    {
        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'code' => 'required|string|max:100|unique:categories,code,' . $category->id,
            'en' => 'required|string|max:255',
            'fr' => 'nullable|string|max:255',
            'ar' => 'nullable|string|max:255',
            'icon' => 'nullable|string|max:255',
            'hex_color' => 'nullable|string|max:50',
            'sort_order' => 'required|integer|min:0',
        ]);

        $category->update($validated);

        return back()->with('success', "Category '{$category->en}' updated successfully.");
    }

    /**
     * Remove the specified category.
     */
    public function destroy(Request $request, int $id): RedirectResponse
    {
        $category = Category::findOrFail($id);

        // Check if category has active business listings linked to it
        if ($category->businesses()->exists()) {
            return back()->withErrors(['error' => 'Cannot delete category containing active business listings.']);
        }

        $category->delete();

        return back()->with('success', "Category '{$category->en}' deleted successfully.");
    }
}
