<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Food extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $fillable = ['user_id', 'name', 'image', 'number','type','ingredients','directions'];
    public $timestamps = false;
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
