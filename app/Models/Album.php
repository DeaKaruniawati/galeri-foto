<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'user_id'];

    // Relasi dengan gambar-gambar di album ini
    public function images()
    {
        return $this->hasMany(Image::class);
    }

    // Relasi dengan model User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}