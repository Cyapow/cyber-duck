const route = 'employees'

const fields = [
  {
    column: 'id',
    type: 'string',
    editable: false,
  },
  {
    column: 'first_name',
    type: 'string',
    validation: 'required',
  },
  {
    column: 'last_name',
    type: 'string',
    validation: 'required',
  },
  {
    column: 'email',
    type: 'string',
    validation: 'required|email',
  },
  {
    column: 'phone',
    type: 'string',
    validation: 'image',
  },
  {
    column: 'company_id',
    type: 'relationship',
    object: 'companies',
  },
]

export default {
  route,
  fields,
}
