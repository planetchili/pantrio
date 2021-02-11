<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function listUsers()
    {
        $users = User::all();

        return view('butts', [
            'users' => $users,
        ]);
    }

    public function showUser(User $user)
    {
        return view('butts2', [
            'user' => $user,
        ]);
    }

    public function getTestData()
    {
        return [
            [
                'name' => 'Freezer',
                'items' => [
                    ['name' => 'Pizza', 'qty' => 69],
                    ['name' => 'Pasta', 'qty' => 420],
                    ['name' => 'Human Head of Lettuce', 'qty' => 1000],
                    ['name' => 'Doritos', 'qty' => 33],
                ],
            ],
            [
                'name' => 'Pantry',
                'items' => [
                    ['name' => 'Panties', 'qty' => 3],
                ],
            ],
            [
                'name' => 'Fridge',
                'items' => [],
            ]
        ];
    }
}
