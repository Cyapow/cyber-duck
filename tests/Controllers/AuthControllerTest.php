<?php

namespace Tests\Controllers;

use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    /**
     * Login as default API user and get token back.
     *
     * @return void
     */
    public function testLogin()
    {
        $email = $this->email;
        $password = $this->password;

        $response = $this->json('POST', '/api/login', [
            'email' => $email,
            'password' => $password
        ]);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'access_token', 'token_type', 'expires_in'
            ]);
    }

    /**
     * Login as default API user and get token back.
     *
     * @return void
     */
    public function testLoginFails()
    {
        $response = $this->json('POST', '/api/login', [
            'email' => 'joe@blogs.com',
            'password' => '123445',
        ]);

        $response
            ->assertStatus(401)
            ->assertExactJson([
                'error' => 'Unauthorized'
            ]);
    }

    /**
     * Test logout.
     *
     * @return void
     */
    public function testLogout()
    {
        $this->actingAs($this->user);

        $response = $this->json('POST', '/api/logout', []);

        $response
            ->assertStatus(200)
            ->assertExactJson([
                'message' => 'Successfully logged out'
            ]);
    }

    /**
     * Test token refresh.
     *
     * @return void
     */
    public function testRefresh()
    {
        $this->actingAs($this->user);

        $response = $this->json('POST', '/api/refresh', []);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'access_token', 'token_type', 'expires_in'
            ]);
    }

}
