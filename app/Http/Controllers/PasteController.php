<?php

namespace App\Http\Controllers;

use App\Models\Paste;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class PasteController extends Controller
{
    public function create()
    {
        return Inertia::render('Pastes/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'content' => 'required|string',
            'language' => 'required|string',
            'expiration' => 'required|string|in:never,1h,1d,1w,1m,1y',
            'password' => 'nullable|string|min:6',
        ]);

        $expiresAt = match ($validated['expiration']) {
            'never' => null,
            '1h' => now()->addHour(),
            '1d' => now()->addDay(),
            '1w' => now()->addWeek(),
            '1m' => now()->addMonth(),
            '1y' => now()->addYear(),
        };

        $paste = Paste::create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'language' => $validated['language'],
            'expires_at' => $expiresAt,
            'password' => $validated['password'],
            'user_id' => Auth::id(),
        ]);

        return redirect()->route('pastes.show', $paste->slug);
    }

    public function show($slug)
    {
        $paste = Paste::where('slug', $slug)->firstOrFail();

        if ($paste->isExpired()) {
            $paste->delete();
            abort(404);
        }

        $isVerified = session()->has("paste_verified_{$paste->id}");

        return inertia('Pastes/Show', [
            'paste' => [
                'id' => $paste->id,
                'slug' => $paste->slug,
                'title' => $paste->title,
                'content' => ($paste->has_password && !$isVerified) ? '[Protected Content]' : $paste->content,
                'language' => $paste->language,
                'created_at' => $paste->created_at,
                'expires_at' => $paste->expires_at,
                'has_password' => $paste->has_password,
            ],
        ]);
    }

    public function verifyPassword(Request $request, $slug)
    {
        $paste = Paste::where('slug', $slug)->firstOrFail();

        if (!$paste->password) {
            return response()->json(['error' => 'This paste is not password protected'], 400);
        }

        if (!Hash::check($request->password, $paste->password)) {
            return response()->json(['error' => 'Invalid password'], 401);
        }

        return response()->json(['message' => 'Password verified']);
    }

    public function getContent(Request $request, $slug)
    {
        $paste = Paste::where('slug', $slug)->firstOrFail();

        if ($paste->has_password && !session()->has("paste_verified_{$paste->id}")) {
            return response()->json(
                ['error' => 'Password verification required'],
                403
            );
        }

        return response()->json([
            'content' => $paste->content,
            'message' => 'Content retrieved successfully'
        ]);
    }

    public function destroy($slug)
    {
        $paste = Paste::where('slug', $slug)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $paste->delete();

        return redirect()->route('dashboard')
            ->with('message', 'Paste deleted successfully');
    }
}
