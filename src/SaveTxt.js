import React from "react";

/*  var contents = fs.readFileSync('./dmv_file_reader.txt').toString()
 var blob = new Blob([contents], { type: 'text/plain' });
 var file = new File([blob], "foo.txt", {type: "text/plain"}); */

export default function SaveTxt({ list, setFileData, fileData }) {
  const data = new Blob([list.join("\n")], { type: "text/plain" });
  const downloadLink = window.URL.createObjectURL(data);
  return (
    <>
      <a download={`FLUX_${list[0].slice(1)}.txt`} href={downloadLink}>
        <button
          className="btn-dw"
          onClick={() => {
            setFileData({ ...fileData, type: "" });
          }}
        >
          Download Text File
        </button>
      </a>
    </>
  );
}
