<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->user()->pastes();

        // Get filters with defaults
        $filters = array_merge([
            'search' => '',
            'language' => '',
            'sort' => 'newest'
        ], $request->only(['search', 'language', 'sort']));

        // Apply search
        if ($filters['search']) {
            $query->where(function ($q) use ($filters) {
                $q->where('title', 'like', "%{$filters['search']}%")
                    ->orWhere('content', 'like', "%{$filters['search']}%");
            });
        }

        // Apply language filter
        if ($filters['language']) {
            $query->where('language', $filters['language']);
        }

        // Apply sorting
        $query->when($filters['sort'], function ($q, $sort) {
            return match ($sort) {
                'oldest' => $q->oldest(),
                'title' => $q->orderBy('title'),
                'title-desc' => $q->orderByDesc('title'),
                default => $q->latest(),
            };
        }, fn($q) => $q->latest());

        $pastes = $query->paginate(9)
            ->through(fn($paste) => [
                'id' => $paste->id,
                'slug' => $paste->slug,
                'title' => $paste->title,
                'language' => $paste->language,
                'created_at' => $paste->created_at,
                'expires_at' => $paste->expires_at,
                'has_password' => $paste->has_password,
            ])
            ->withQueryString();

        return Inertia::render('Dashboard', [
            'pastes' => $pastes,
            'filters' => $filters,
        ]);
    }
}
