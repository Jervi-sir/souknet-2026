<?php

use App\Mcp\Servers\ChatGptServer;
use Laravel\Mcp\Facades\Mcp;

Mcp::web('/mcp/chatgpt', ChatGptServer::class);
