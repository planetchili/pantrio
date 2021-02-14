<?php

namespace App\Http\Controllers;

use App\Models\StorageArea;
use Illuminate\Http\Request;

class StorageAreaController extends Controller
{
    public function retrieve()
    {
        $areas = StorageArea::all();

        $output = [];
        foreach ($areas as $area) {
            $area_data = $area->toArray();
            $area_data['items'] = [];
            foreach ($area->itemInstances as $instance) {
                $inst_data = $instance->toArray();
                $inst_data['name'] = $instance->item->name;
                $area_data['items'][] = $inst_data;
            }
            $output[] = $area_data;
        }

        return $output;
    }
}
