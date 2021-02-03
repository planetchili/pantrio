<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
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
}
