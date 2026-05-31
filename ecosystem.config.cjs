module.exports = {
    apps: [
        {
            name: 'souknet-2026:laravel-api',
            script: 'artisan',
            interpreter: 'php',
            args: 'serve --host=0.0.0.0 --port=18010',
            cwd: '/home/jervi/projects/souknet-2026',
            instances: 1,
            exec_mode: 'fork',
            watch: false,
            max_memory_restart: '512M',
            env: {
                APP_ENV: 'production',
            },
        },
        {
            name: 'souknet-2026:laravel-worker',
            script: 'artisan',
            interpreter: 'php',
            args: 'queue:work --sleep=3 --tries=3 --max-time=3600',
            cwd: '/home/jervi/projects/souknet-2026',
            instances: 1,
            exec_mode: 'fork',
            watch: false,
            max_memory_restart: '512M',
            env: {
                APP_ENV: 'production',
            },
        },
    ],
};
