<?php

namespace App\Http\Controllers;

use App\Models\Paste;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class PasteVerificationController extends Controller
{
    public function verify(Request $request, $slug)
    {
        $paste = Paste::where('slug', $slug)->firstOrFail();

        $request->validate([
            'password' => 'required|string',
        ]);

        if (!$paste->verifyPassword($request->password)) {
            throw ValidationException::withMessages([
                'password' => 'The provided password is incorrect.',
            ]);
        }

        // Store verification in session
        session()->put("paste_verified_{$paste->id}", true);

        // Return Inertia response
        return Inertia::location(route('pastes.show', $paste->slug));
    }
}
