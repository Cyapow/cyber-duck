<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $employees = Employee::with('company')->paginate(10);

        return response()->json($employees);
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
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'company_id' => 'required|exists:companies,id',
        ]);

        $company = Company::findOrFail($request['company_id']);

        $employee = $company->employees()->create(
            $request->only([
                'first_name',
                'last_name',
                'email',
                'phone'
            ])
        );

        return response('', 201)
            ->header('Location', Config::get('app.url').'/api/employees/'.$employee->id);
    }

    /**
     * Display the specified resource.
     *
     * @param Employee $employee
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Employee $employee)
    {
        $item = Employee::with('company')->find($employee->id);

        return response()->json($item);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Employee $employee
     * @return void
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(Request $request, Employee $employee)
    {
        $this->validate($request, [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'company_id' => 'required|exists:companies,id',
        ]);
        $employee->update([
            'first_name' => $request['first_name'],
            'last_name' => $request['last_name'],
            'email' => $request['email'],
            'phone' => $request['phone'],
            'company_id' => $request['company_id'],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Employee $employee
     * @return void
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function count()
    {
        return response()->json(['total' => Employee::count()]);
    }
}
