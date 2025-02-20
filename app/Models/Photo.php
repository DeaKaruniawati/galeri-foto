<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;

    protected $fillable = [
        'album_id',
        'path',
    ];

    // Relasi: Foto milik sebuah album
    public function album()
    {
        return $this->belongsTo(Album::class);
    }
}

