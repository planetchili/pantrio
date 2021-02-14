<?php

namespace Database\Factories;

use App\Models\ItemInstance;
use Illuminate\Database\Eloquent\Factories\Factory;

class ItemInstanceFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ItemInstance::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'quantity' => $this->faker->numberBetween(0, 15),
        ];
    }
}
