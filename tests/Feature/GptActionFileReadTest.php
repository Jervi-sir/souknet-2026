<?php

test('gpt action reads an allowlisted project source file', function () {
    $response = $this->getJson('/api/gpt/file?path=routes/web.php');

    $response
        ->assertOk()
        ->assertJsonPath('path', 'routes/web.php')
        ->assertJsonPath('truncated', false)
        ->assertJsonPath('maximum_characters', 12000);

    expect($response->json('contents'))->toContain("Route::inertia('/', 'welcome')");
});

test('gpt action refuses paths outside the allowlist', function () {
    $this->getJson('/api/gpt/file?path=../../.env')
        ->assertNotFound();
});

test('gpt action refuses unsupported file extensions', function () {
    $this->getJson('/api/gpt/file?path=routes/web.php.bak')
        ->assertNotFound();
});
