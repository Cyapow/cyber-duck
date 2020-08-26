<?php

namespace Tests\Controllers;

use App\Models\Company;
use Carbon\Carbon;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class CompanyControllerTest extends TestCase
{
    public function testItFailsWhenNotLoggedIn()
    {
        $response = $this->json('GET', '/api/companies');

        $response
            ->assertStatus(401)
            ->assertExactJson([
                'message' => 'Unauthenticated.'
            ]);
    }

    public function testItListsCompanies()
    {
        factory(Company::class, 4)->create();
        $this->actingAs($this->user);
        $response = $this->json('GET', '/api/companies');

        $response->assertJsonCount(4, 'data');

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'current_page', 'data', 'first_page_url', 'from', 'last_page', 'last_page_url',
                'next_page_url', 'path', 'per_page', 'prev_page_url', 'to', 'total'
            ]);
    }

    public function testItStoresNewCompanies()
    {
        $now = now();
        Carbon::setTestNow($now);
        $this->actingAs($this->user);
        $data = [
            'name' => 'My company',
            'email' => 'joe@blogs.com',
            'website' => 'http://google.com',
            'logo' => UploadedFile::fake()->image('filename.jpg', 100, 100)
        ];
        $this->json('POST', '/api/companies', $data);

        $this->assertDatabaseHas('companies', [
            'name' => 'My company',
            'email' => 'joe@blogs.com',
            'website' => 'http://google.com',
            'logo' => $now->timestamp . 'filename.jpg',
        ]);
    }

    public function testItUpdatesCompanies()
    {
        $now = now();
        Carbon::setTestNow($now);
        $this->actingAs($this->user);
        $factory = factory(Company::class)->create();
        $data = [
            'name' => 'My company',
            'email' => 'joe@blogs.com',
            'website' => 'http://google.com',
            'logo' => UploadedFile::fake()->image('newfilename.jpg', 100, 100)
        ];

        $company = Company::find($factory->id);

        $this->assertEquals($factory->name, $company->name);
        $this->assertEquals($factory->email, $company->email);
        $this->assertEquals($factory->website, $company->website);

        $this->json('PUT', "/api/companies/{$factory->id}", $data);

        $company = Company::find($factory->id);

        $this->assertEquals($data['name'], $company->name);
        $this->assertEquals($data['email'], $company->email);
        $this->assertEquals($data['website'], $company->website);
        $this->assertEquals($now->timestamp . 'newfilename.jpg', $company->logo);
    }

    public function testItShowsAnCompany()
    {
        $this->actingAs($this->user);
        $factory = factory(Company::class)->create();
        $response = $this->json('GET', "/api/companies/{$factory->id}");

        $response->assertExactJson(Company::find($factory->id)->toArray());
    }

    public function testItDeletesAnCompany()
    {
        $this->actingAs($this->user);
        $factory = factory(Company::class)->create();
        $this->json('DELETE', "/api/companies/{$factory->id}");
        $this->assertDeleted($factory);
    }

    public function testItCountsAllCompanies()
    {
        $this->actingAs($this->user);
        factory(Company::class, 5)->create();
        $response = $this->json('GET', '/api/counters/companies');
        $response->assertExactJson(['total' => 5]);
    }
}
