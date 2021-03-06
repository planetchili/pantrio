<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\ItemInstance;
use App\Models\StorageArea;
use Illuminate\Http\Request;

class StorageAreaController extends Controller
{
    public function retrieve()
    {
        return [
            'areas' => StorageArea::all(),
            'items' => Item::all(),
            'instances' => ItemInstance::all(),
        ];
    }
}
