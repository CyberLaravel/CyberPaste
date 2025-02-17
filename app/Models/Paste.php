<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class Paste extends Model
{
    protected $fillable = [
        'title',
        'content',
        'slug',
        'password',
        'expires_at',
        'language',
        'user_id',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
    ];

    protected $hidden = [
        'password',
    ];

    protected $appends = [
        'has_password',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($paste) {
            $paste->slug = Str::random(10);
        });
    }

    public function isExpired()
    {
        return $this->expires_at && $this->expires_at->isPast();
    }

    public function getHasPasswordAttribute(): bool
    {
        return !empty($this->password);
    }

    public function setPasswordAttribute(?string $value)
    {
        $this->attributes['password'] = $value ? Hash::make($value) : null;
    }

    public function verifyPassword(string $password): bool
    {
        return Hash::check($password, $this->password);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
