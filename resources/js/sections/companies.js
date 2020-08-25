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
    validation: "required"
  },
  {
    column: "email",
    title: "Email",
    type: "text",
    validation: "required|email"
  },
  {
    column: "logo",
    title: "Logo",
    type: "file",
    fileType: "image",
    validation: "image|MinDimensions:100,100"
  },
  {
    column: "website",
    title: "Website",
    type: "text",
    validation: "required|url"
  }
];

export default {
  route,
  fields,
  title,
  titlePlural
};
