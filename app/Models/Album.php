<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    use HasFactory;

    // Menentukan atribut yang dapat diisi (mass assignable)
    protected $fillable = ['title', 'description', 'user_id'];
    
    // Relasi: Album memiliki banyak foto
    public function photos()
    {
        return $this->hasMany(Photo::class);
    }
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
