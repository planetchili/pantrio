<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemInstance extends Model
{
    use HasFactory;

    protected $fillable = ['storage_area_id', 'item_id', 'quantity'];

    public function storageArea()
    {
        return $this->belongsTo(StorageArea::class);
    }

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
