<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    // Tentukan kolom-kolom yang dapat diisi
    protected $fillable = [
        'filename', 
        'file_path', 
        'file_type', 
        'file_size', 
        'user_id'
    ];

    // Relasi dengan model User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
