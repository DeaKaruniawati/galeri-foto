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
        'file_name', 
        'file_size', 
        'file_type', 
        'uploaded_at'
    ];

    // Relasi dengan model User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
