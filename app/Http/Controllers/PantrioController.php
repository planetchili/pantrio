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
            'area_name' => 'required|unique:storage_areas,name',
        ]);
        $area = StorageArea::create(['name' => $request->area_name]);
        return compact('area');
    }

    public function addItem(Request $request)
    {
        $this->validate($request, [
            'item_name' => 'required|unique:items,name',
        ]);
        $item = Item::create(['name' => $request->item_name]);
        return compact('item');
    }

    public function addInstance(Request $request)
    {
        $this->validate($request, [
            'item_id' => "required|exists:items,id|unique:item_instances,item_id,,,storage_area_id,$request->storage_area_id",
            'storage_area_id' => 'required|exists:storage_areas,id',
            'quantity' => 'required|integer|min:1',
        ],[
            'item_id.unique' => 'Item-area pairing already exists.',
        ]);
        $instance = ItemInstance::create($request->only(['item_id', 'storage_area_id', 'quantity']));
        return compact('instance');
    }
}
