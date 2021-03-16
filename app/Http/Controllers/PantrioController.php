<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\ItemInstance;
use App\Models\StorageArea;
use Illuminate\Http\Request;

class PantrioController extends Controller
{
    public function retrieveInitialState()
    {
        return [
            'areas' => StorageArea::all(),
            'items' => Item::all(),
            'instances' => ItemInstance::all(),
        ];
    }

    public function addArea(Request $request)
    {
        $this->validate($request, [
            'area_name' => 'unique:storage_areas,name',
        ]);
        $area = StorageArea::create(['name' => $request->area_name]);
        return compact('area');
    }
}
