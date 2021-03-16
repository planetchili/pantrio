<?php

namespace Database\Factories;

use App\Models\StorageArea;
use Illuminate\Database\Eloquent\Factories\Factory;

class StorageAreaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = StorageArea::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->unique()->company,
        ];
    }
}
