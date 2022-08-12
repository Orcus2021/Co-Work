import { useEffect, useState, useRef } from "react";

const ImageUploader = () => {
  // const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState([]);
  const fileInput = useRef(null);
  const handleOndragOver = (event) => {
    event.preventDefault();
  };
  const handleOndrop = (event) => {
    //prevent the browser from opening the image
    event.preventDefault();
    event.stopPropagation();
    //let's grab the image file
    let imageFile = event.dataTransfer.files[0];
    handleFile(imageFile);
  };
  const handleFile = (file) => {
    //you can carry out any file validations here...
    // setImage(file);
    const newURL = URL.createObjectURL(file);

    setPreviewUrl((pre) => {
      pre.push(newURL);
      const newArr = [...pre];
      return newArr;
    });
    console.log(file);
  };
  return (
    <div className="wrapper">
      <div
        className="drop_zone"
        style={{ height: "300px", backgroundColor: "lightblue" }}
        onDragOver={handleOndragOver}
        onDrop={handleOndrop}
        onClick={() => fileInput.current.click()}
      >
        <p>Click to select or Drag and drop image here....</p>
        <input
          type="file"
          accept="image/*"
          ref={fileInput}
          hidden
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>
      {previewUrl.length > 0 &&
        previewUrl.map((img) => {
          return <img src={img} alt="image" />;
        })}
      {/* {previewUrl && <img src={previewUrl} alt="image" />} */}
    </div>
  );
};

export default ImageUploader;
