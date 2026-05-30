<?php

namespace App\Http\Controllers\Public\Engage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EngageEmailController extends Controller
{
    public function __invoke(Request $request): Response
    {
        return Inertia::render('public/engage/emails/page');
    }
}
