<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;


class Admin extends Authenticatable  
{
    use Notifiable;
    protected $guard = 'admin'; // Tentukan guard untuk model ini

    protected $fillable = [
        'name', 
        'email', 
        'password'
    ];

    protected $hidden = [
        'password', 
        'remember_token'
    ];

 
}
