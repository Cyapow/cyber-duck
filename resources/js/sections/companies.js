const route = "companies";

const title = "Company";

const titlePlural = "Companies";

const fields = [
  {
    column: "id",
    title: "ID",
    type: "text",
    editable: false
  },
  {
    column: "name",
    title: "Name",
    type: "text",
    validation: "required",
    editable: false
  },
  {
    column: "email",
    title: "Email",
    type: "text",
    validation: "required|email",
    editable: false
  },
  {
    column: "logo",
    title: "Logo",
    type: "file",
    fileType: "image",
    validation: "image|MinDimensions:100,100",
    editable: false
  }
];

export default {
  route,
  fields,
  title,
  titlePlural
};
