<?php

namespace App\Http\Controllers\Public\Inbound;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InboundWebsiteVisitorsController extends Controller
{
    public function __invoke(Request $request): Response
    {
        return Inertia::render('public/inbound/website-visitors/page');
    }
}
