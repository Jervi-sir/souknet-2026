<?php

test('gpt action status lists project analysis actions without authentication', function () {
    $this->getJson('/api/gpt/about')
        ->assertOk()
        ->assertJsonPath('available_actions.0', 'analyzeFiles')
        ->assertJsonPath('available_actions.5', 'analyzeProjectContext');
});

test('gpt action can inspect an allowlisted project area without returning source contents', function () {
    $this->getJson('/api/gpt/analyze/frontend')
        ->assertOk()
        ->assertJsonPath('area', 'frontend')
        ->assertJsonPath('analysis.directories.0.directory', 'resources/js/pages')
        ->assertJsonStructure(['analysis' => ['directories' => [['files']]]]);
});

test('gpt action rejects an unknown project area', function () {
    $this->getJson('/api/gpt/analyze/private-config')
        ->assertNotFound();
});
