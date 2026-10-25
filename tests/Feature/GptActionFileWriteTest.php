<?php

test('gpt action creates a file in an allowlisted project directory', function () {
    $path = 'resources/js/gpt-action-write-test.ts';

    try {
        $this->putJson('/api/gpt/file', [
            'path' => $path,
            'contents' => 'export const gptActionWriteTest = true;',
        ])
            ->assertOk()
            ->assertJsonPath('path', $path)
            ->assertJsonPath('bytes_written', strlen('export const gptActionWriteTest = true;'));

        expect(file_get_contents(base_path($path)))->toBe('export const gptActionWriteTest = true;');
    } finally {
        if (is_file(base_path($path))) {
            unlink(base_path($path));
        }
    }
});

test('gpt action overwrites an allowlisted project file', function () {
    $path = 'resources/js/gpt-action-write-test.ts';
    file_put_contents(base_path($path), 'export const previous = true;');

    try {
        $this->putJson('/api/gpt/file', [
            'path' => $path,
            'contents' => 'export const updated = true;',
        ])->assertOk();

        expect(file_get_contents(base_path($path)))->toBe('export const updated = true;');
    } finally {
        if (is_file(base_path($path))) {
            unlink(base_path($path));
        }
    }
});

test('gpt action refuses paths outside the write allowlist', function () {
    $this->putJson('/api/gpt/file', [
        'path' => '../../.env',
        'contents' => 'APP_ENV=compromised',
    ])->assertNotFound();
});

test('gpt action refuses unsupported extensions', function () {
    $this->putJson('/api/gpt/file', [
        'path' => 'routes/web.php.bak',
        'contents' => 'not allowed',
    ])->assertNotFound();
});

test('gpt action rejects write contents over 64 kibibytes', function () {
    $this->putJson('/api/gpt/file', [
        'path' => 'resources/js/too-large.ts',
        'contents' => str_repeat('x', 65537),
    ])->assertUnprocessable();
});
