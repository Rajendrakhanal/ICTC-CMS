import React, { useState, useRef } from "react";
import axios from "axios";
import loader from "./loading image.gif";

// const BOT_TOKEN = "5639755535:AAFWlHOyhBANI0u-6GFHspbkP4h5E-aBoxY";
// const CHAT_ID = "5891316395";

const BOT_TOKEN = process.env.REACT_APP_BOT_TOKEN;
const CHAT_ID = process.env.REACT_APP_CHAT_ID;

const sendPhoto = async (photo, caption) => {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;

  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("chat_id", CHAT_ID);
  if (caption) {
    formData.append("caption", caption);
  }

  const response = await axios.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

const fileUrl = async (file_id) => {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${file_id}`;
  const response = await axios.post(url);
  return response.data;
};

function ImageUploader({ dataFromChild ,clicked}) {
  const inputRef = useRef(null);
  if(clicked){inputRef.current.value = "";}
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const response = await sendPhoto(file, "Photo being uploaded from ICTC");
    const file_id = response.result.photo[response.result.photo.length - 1].file_id;
    const fileUrlResponse = await fileUrl(file_id);
    const final_url = fileUrlResponse.result.file_path;
    const image_url = `https://api.telegram.org/file/bot${BOT_TOKEN}/${final_url}`;
    dataFromChild(image_url,loading);
    setLoading(false);
  };

  return (
    <>
    {loading?<div className="row g-3 mb-2">
        <div
          className="col"
          style={{
            borderRadius: "5px",
            border: "1px solid #ccc",
            outline: "none",
            marginLeft:"7px",
            marginTop:"5.5px"
          }}
        >
          <input ref={inputRef}
            style={{ marginLeft: "5px", marginTop: "9px", marginBottom:"10px" }}
            type="file"
            onChange={handleFileUpload}
          />
        </div>
        <div className="col">
          {loading ? (
            <img
              src={loader}
              alt="Uploading File hold"
              style={{ height: "40px", width: "100px" }}
            />
          ) : null}
        </div>
      </div>:<div className="row g-3 mb-2">
        <div
          className="col"
          style={{
            borderRadius: "5px",
            border: "1px solid #ccc",
            outline: "none",
            marginLeft:"7px",
            marginTop:"5.5px"
          }}
        >
          <input ref={inputRef}
            style={{ marginLeft: "5px", marginTop: "9px", marginBottom:"10px" }}
            type="file"
            onChange={handleFileUpload}
          />
        </div>
      </div>}
      
    </>
  );
}

export default ImageUploader;
