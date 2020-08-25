const route = 'employees'

const title = 'Employee'

const titlePlural = 'Employees'

const fields = [
  {
    column: 'id',
    title: 'ID',
    type: 'string',
    editable: false,
  },
  {
    column: 'first_name',
    title: 'First Name',
    type: 'string',
    validation: 'required',
  },
  {
    column: 'last_name',
    title: 'Last Name',
    type: 'string',
    validation: 'required',
  },
  {
    column: 'email',
    title: 'Email',
    type: 'string',
    validation: 'required|email',
  },
  {
    column: 'phone',
    title: 'Phone Number',
    type: 'string',
    validation: 'image',
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
