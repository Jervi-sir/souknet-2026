<?php

namespace App\Http\Controllers\Public\WinDeals;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DealsController extends Controller
{
    public function __invoke(Request $request): Response
    {
        return Inertia::render('public/win-deals/deals/page');
    }
}
