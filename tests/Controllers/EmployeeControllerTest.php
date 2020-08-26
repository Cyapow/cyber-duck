<?php

namespace Tests\Controllers;

use App\Models\Company;
use App\Models\Employee;
use Tests\TestCase;

class EmployeeControllerTest extends TestCase
{
    public function testItFailsWhenNotLoggedIn()
    {
        $response = $this->json('GET', '/api/employees');

        $response
            ->assertStatus(401)
            ->assertExactJson([
                'message' => 'Unauthenticated.'
            ]);
    }

    public function testItListsEmployees()
    {
        factory(Employee::class, 4)->create();
        $this->actingAs($this->user);
        $response = $this->json('GET', '/api/employees');

        $response->assertJsonCount(4, 'data');

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'current_page', 'data', 'first_page_url', 'from', 'last_page', 'last_page_url',
                'next_page_url', 'path', 'per_page', 'prev_page_url', 'to', 'total'
            ]);
    }

    public function testItStoresNewEmployees()
    {
        $this->actingAs($this->user);
        $company = factory(Company::class)->create();
        $data = [
            'first_name' => 'Joe',
            'last_name' => 'Blogs',
            'email' => 'joe@blogs.com',
            'phone' => '01356984456',
            'company_id' => $company->id,
        ];
        $response = $this->json('POST', '/api/employees', $data);
        $this->assertDatabaseHas('employees', $data);
    }

    public function testItUpdatesEmployees()
    {
        $this->actingAs($this->user);
        $company = factory(Company::class)->create();
        $factory = factory(Employee::class)->create();
        $data = [
            'first_name' => 'Joe',
            'last_name' => 'Blogs',
            'email' => 'joe@blogs.com',
            'phone' => '01356984456',
            'company_id' => $company->id,
        ];

        $employee = Employee::find($factory->id);

        $this->assertEquals($factory->first_name, $employee->first_name);
        $this->assertEquals($factory->last_name, $employee->last_name);
        $this->assertEquals($factory->email, $employee->email);
        $this->assertEquals($factory->phone, $employee->phone);
        $this->assertEquals($factory->company_id, $employee->company_id);

        $this->json('PUT', "/api/employees/{$factory->id}", $data);

        $employee = Employee::find($factory->id);

        $this->assertEquals($data['first_name'], $employee->first_name);
        $this->assertEquals($data['last_name'], $employee->last_name);
        $this->assertEquals($data['email'], $employee->email);
        $this->assertEquals($data['phone'], $employee->phone);
        $this->assertEquals($data['company_id'], $employee->company_id);
    }

    public function testItShowsAnEmployee()
    {
        $this->actingAs($this->user);
        $factory = factory(Employee::class)->create();
        $response = $this->json('GET', "/api/employees/{$factory->id}");

        $response->assertExactJson(Employee::with('company')->find($factory->id)->toArray());
    }

    public function testItDeletesAnEmployee()
    {
        $this->actingAs($this->user);
        $factory = factory(Employee::class)->create();
        $this->json('DELETE', "/api/employees/{$factory->id}");
        $this->assertDeleted($factory);
    }

    public function testItCountsAllEmployees()
    {
        $this->actingAs($this->user);
        factory(Employee::class, 5)->create();
        $response = $this->json('GET', '/api/counters/employees');
        $response->assertExactJson(['total' => 5]);
    }
}
