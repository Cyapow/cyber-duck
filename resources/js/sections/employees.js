const route = 'employees'

const title = 'Employee'

const titlePlural = 'Employees'

const fields = [
  {
    column: 'id',
    title: 'ID',
    type: 'text',
    editable: false,
  },
  {
    column: 'first_name',
    title: 'First Name',
    type: 'text',
    validation: 'required',
  },
  {
    column: 'last_name',
    title: 'Last Name',
    type: 'text',
    validation: 'required',
  },
  {
    column: 'email',
    title: 'Email',
    type: 'text',
    validation: 'required|email',
  },
  {
    column: 'phone',
    title: 'Phone Number',
    type: 'text',
    validation: 'required',
  },
  {
    column: 'company_id',
    title: 'Company',
    type: 'relationship',
    object: 'companies',
  },
]

export default {
  route,
  fields,
  title,
  titlePlural,
}
