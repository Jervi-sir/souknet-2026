<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class CashierController extends Controller
{
    /**
     * Handle a stripe webhook call.
     *
     * Props: None
     * Middleware: None
     * Services: None
     */
    public function handleWebhook(): Response
    {
        return response('Webhook Handled', 200);
    }
}
