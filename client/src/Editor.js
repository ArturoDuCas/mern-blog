import ReactQuill from "react-quill";

const modules = {
  toolbar: [
    [{"header": [1,2,false]}],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{"list": "ordered"}, {"list": "bullet"}, {"indent": "-1"}, {"indent": "+1"}],
    ["link", "image"],
    ["clean"],
    ["code-block"]
  ]
}

const formats = [
  "header",
  "bold", "italic", "underline", "strike", "blockquote",
  "list", "bullet", "indent",
  "link", "image",
  "code-block"
];


export default function Editor({value, onChange}) {

  return(
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      theme={"snow"}
    />
  );
}