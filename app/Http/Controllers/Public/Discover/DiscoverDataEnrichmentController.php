<?php

namespace App\Http\Controllers\Public\Discover;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DiscoverDataEnrichmentController extends Controller
{
    public function __invoke(Request $request): Response
    {
        return Inertia::render('public/discover/data-enrichment/page');
    }
}
