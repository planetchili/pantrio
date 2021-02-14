<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StorageArea extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function itemInstances()
    {
        return $this->hasMany(ItemInstance::class);
    }
}
