<?php

namespace App\Http\Controllers\Public\ToolsAutomations;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ToolsAutomationsWorkflowsController extends Controller
{
    public function __invoke(Request $request): Response
    {
        return Inertia::render('public/tools-automations/workflows/page');
    }
}
