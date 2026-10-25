<?php

namespace App\Mcp\Servers;

use Laravel\Mcp\Server;

class ChatGptServer extends Server
{
    protected string $name = 'Souknet';

    protected string $version = '1.0.0';

    protected string $instructions = 'Connect ChatGPT to the Souknet MCP server. No tools are currently exposed.';
}
