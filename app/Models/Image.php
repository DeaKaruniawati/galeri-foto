<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    // Tentukan kolom-kolom yang dapat diisi
    protected $fillable = [
        'file_name', 
        'file_size', 
        'file_type', 
        'file_path',
        'uploaded_at'
    ];

    // Relasi dengan model User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function favorites()
    {
        return $this->hasMany(Favorite::class, 'image_id');
    }
}
