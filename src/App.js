import React from "react";
import { parse } from "papaparse";
import { CSVLink } from "react-csv";
import SaveTxt from "./SaveTxt";
import toCsv from "./toCsv";
import toTxt from "./toTxt";
import "./styles.css";

export default function App() {
  const [highlighted, setHighlighted] = React.useState(false);
  const initialFileData = {
    type: null,
    content: null
  };
  const [fileData, setFileData] = React.useState(initialFileData);

  return (
    <div className="App">
      <h1>Data Transform test App</h1>
      <div
        className={`dropzone ${
          highlighted ? "dropzone-true" : "dropzone-false"
        }`}
        onDragEnter={() => {
          setHighlighted(true);
        }}
        onDragLeave={() => {
          setHighlighted(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          setHighlighted(false);
          const file = e.dataTransfer.files[0];
          const type = e.dataTransfer.files[0].type;
          async function handle() {
            const text = await (await file.text()).replace(/["]/g, "");
            console.log("VAR TEXT", text);
            if (type === "application/vnd.ms-excel") {
              const { data } = await parse(text, {
                header: true,
                delimeter: ","
              });
              console.log(data);
              let txtData = await toTxt(data);
              setFileData({ type: "txt", content: txtData });
              console.log(fileData);
            }
            if (type === "text/plain") {
              const { data } = parse(text, { header: false });
              console.log(data);
              let csvData = await toCsv(data);
              setFileData({ type: "csv", content: csvData });
              console.log(fileData);
            }
          }
          handle();
        }}
      >
        <p>Drop csv/txt file Here</p>
      </div>
      {fileData.type === "csv" && (
        <div>
          <CSVLink data={fileData.content.content} enclosingCharacter={``}>
            <button
              className="btn-dw"
              onClick={() => setFileData({ ...fileData, type: "" })}
            >
              Download CSV
            </button>
          </CSVLink>
        </div>
      )}
      {fileData.type === "txt" && (
        <div>
          <SaveTxt
            list={fileData.content}
            setFileData={setFileData}
            fileData={fileData}
          ></SaveTxt>
        </div>
      )}
    </div>
  );
}
