async function handleImageUpload(image: any, typeOfPic = "avatar") {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", typeOfPic);
  data.append("cloud_name", "anhdt0307");
  const response = await fetch(
    "https://api.cloudinary.com/v1_1/anhdt0307/image/upload",
    {
      method: "POST",
      body: data,
    }
  );
  const jsonResponse = await response.json();
  return jsonResponse.url;
}

export default handleImageUpload;
