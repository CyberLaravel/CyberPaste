<?php

namespace App\Providers;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

/**
 * AppServiceProvider handles application-wide service configurations
 * This is one of Laravel's core service providers where you can register
 * and bootstrap application-wide services and configurations
 */
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     * This method is called during the registration phase of the service container
     * Use this for binding things into the service container
     */
    public function register(): void
    {
        // Check if the application is running in production environment
        if (App::environment('production')) {
            // Force HTTPS by setting the server variable
            // This ensures that all requests are treated as HTTPS requests
            // Useful when running behind a load balancer or proxy
            $this->app['request']->server->set('HTTPS', true);
        }
    }

    /**
     * Bootstrap any application services.
     * This method is called after all services are registered
     * Use this for any initialization code that depends on other services
     */
    public function boot(): void
    {
        // Force HTTPS URLs in production environment
        // This ensures that all generated URLs use HTTPS protocol
        // Important for security in production environments
        if (config('app.env') === 'production') {
            URL::forceScheme('https');
        }

        Vite::prefetch(concurrency: 3);
    }
}
