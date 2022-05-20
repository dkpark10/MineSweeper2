import React, { useRef, useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['clean']                                         // remove formatting button
];

const Editor = () => {
  const [contents, setContents] = useState<string>("");
  const quillRef = useRef<ReactQuill>();
  const modules = useMemo(() => ({
    toolbar: toolbarOptions
  }), []);

  return (
    <>
      <ReactQuill
        ref={element => {
          if (element !== null)
            quillRef.current = element;
        }}
        value={contents}
        onChange={setContents}
        modules={modules}
        theme="snow"
        style={{
          height: "80%"
        }}
      />
    </>
  )
};

export default React.memo(Editor);