<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Storage;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($user) {
            // Delete user images from storage
            foreach ($user->images as $image) {
                if ($image->file_path && Storage::disk('public')->exists($image->file_path)) {
                    Storage::disk('public')->delete($image->file_path);
                }
            }

            // Delete album photos from storage
            foreach ($user->albums as $album) {
                foreach ($album->photos as $photo) {
                    if ($photo->path && Storage::disk('public')->exists($photo->path)) {
                        Storage::disk('public')->delete($photo->path);
                    }
                }
            }

            // Delete related records from the database
            $user->images()->delete();
            $user->albums()->delete();
        });
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    
    public function images()
    {
        return $this->hasMany(Image::class); // Relasi dengan model Image
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class); // Menghubungkan dengan tabel 'favorites'
    }

    public function albums()
    {
        return $this->hasMany(Album::class); // Relasi dengan model Album
    }
}
