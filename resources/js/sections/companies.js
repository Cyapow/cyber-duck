const route = 'companies'

const fields = [
  {
    column: 'id',
    type: 'string',
    editable: false,
  },
  {
    column: 'name',
    type: 'string',
    validation: 'required',
    editable: false,
  },
  {
    column: 'email',
    type: 'string',
    validation: 'required|email',
    editable: false,
  },
  {
    column: 'logo',
    type: 'string',
    validation: 'image',
    editable: false,
  },
]

export default {
  route,
  fields,
}
