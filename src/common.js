export const toolbar_options = [
  [{ header: [1, 2, 3, 4, 5, 6,] }],
  [{ font: [] }],
  [
    {
      size: [
        "9px",
        "10px",
        "11px",
        "12px",
        "14px",
        "16px",
        "18px",
        "20px",
        "22px",
        "24px",
        "26px",
        "28px",
      ],
    },
  ],

  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }], // toggled buttons
  ["blockquote", "code-block"],

  // [{ header: 1 }, { header: 2 }], // custom button values
  [{ script: "sub" }, { script: "super" }],
  [{ list: "ordered" }, { list: "bullet" }], // superscript/subscript
  [{ align: [] }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  // dropdown with defaults from theme
  // ['link', 'image'],
  ['image'],

  ["clean"], // remove formatting button
];
