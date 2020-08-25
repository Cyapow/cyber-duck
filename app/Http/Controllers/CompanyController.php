<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $companies = Company::paginate(10);

        return response()->json($companies);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email',
            'logo' => 'required|image|dimensions:min_width=100,min_height=100',
            'website' => 'required|exists:companies,id',
        ]);
        $employee = Company::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'logo' => $request['logo'],
            'website' => $request['website'],
        ]);

        return response('', 201)
            ->header('Location', Config::get('app.url').'/api/employees/'.$employee->id);
    }

    /**
     * Display the specified resource.
     *
     * @param Company $company
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Company $company)
    {
        return response()->json($company);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Company $company
     * @return void
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(Request $request, Company $company)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email',
            'logo' => 'sometimes|image|dimensions:min_width=100,min_height=100',
            'website' => 'required|url',
        ]);
        $company->update([
            'name' => $request['name'],
            'email' => $request['email'],
            //'logo' => $request['logo'],
            'website' => $request['website'],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Company $company
     * @return void
     */
    public function destroy(Company $company)
    {
        $company->delete();
    }
}
