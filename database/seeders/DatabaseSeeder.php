<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\ItemInstance;
use App\Models\StorageArea;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(10)->create();

        $areas = StorageArea::factory(4)->create();
        $items = Item::factory(8)->create();
        ItemInstance::factory()->create([
            'storage_area_id' => 1,
            'item_id' => 1,
        ]);
        ItemInstance::factory()->create([
            'storage_area_id' => 1,
            'item_id' => 3,
        ]);
        ItemInstance::factory()->create([
            'storage_area_id' => 1,
            'item_id' => 4,
        ]);
        ItemInstance::factory()->create([
            'storage_area_id' => 2,
            'item_id' => 7,
        ]);
        ItemInstance::factory()->create([
            'storage_area_id' => 2,
            'item_id' => 8,
        ]);
        ItemInstance::factory()->create([
            'storage_area_id' => 4,
            'item_id' => 2,
        ]);
        ItemInstance::factory()->create([
            'storage_area_id' => 4,
            'item_id' => 6,
        ]);
        ItemInstance::factory()->create([
            'storage_area_id' => 4,
            'item_id' => 3,
        ]);
    }
}
