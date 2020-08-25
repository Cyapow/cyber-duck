const route = 'companies'

const title = 'Company'

const titlePlural = 'Companies'

const fields = [
  {
    column: 'id',
    title: 'ID',
    type: 'string',
    editable: false,
  },
  {
    column: 'name',
    title: 'Name',
    type: 'string',
    validation: 'required',
    editable: false,
  },
  {
    column: 'email',
    title: 'Email',
    type: 'string',
    validation: 'required|email',
    editable: false,
  },
  {
    column: 'logo',
    title: 'Logo',
    type: 'string',
    validation: 'image',
    editable: false,
  },
]

export default {
  route,
  fields,
  title,
  titlePlural,
}
