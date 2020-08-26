<?php

namespace Tests;

use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\JWTAuth;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;
    use RefreshDatabase;

    public string $email;
    public string $password;
    /**
     * @var User
     */
    public $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->email = 'test@example.com';
        $this->password = 'password';
        $this->user = factory(User::class)->create([
            'email' => $this->email,
            'password' => Hash::make($this->password)
        ]);
    }

    /**
     * Set the currently logged in user for the application.
     *
     * @param  Authenticatable $user
     * @param  string|null                                $driver
     * @return $this
     */
    public function actingAs(Authenticatable $user, $driver = null)
    {
        $auth = app(JWTAuth::class);
        $token = $auth->fromUser($user);
        $this->withHeader('Authorization', "Bearer {$token}");
        parent::actingAs($user);

        return $this;
    }
}
