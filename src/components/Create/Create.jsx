import {  useContext, useRef, useState } from "react"
import "../Create/Create.css"
import camera from "../../assets/icons/camera.svg"
import axios from "axios"
import { ThemeContext } from "../ThemeContext/ThemeContext"


export const Create = () => {

    const fileInputRef = useRef(null);
    const[caption, setCaption] = useState("");
    const [location, setLocation] = useState("");
    const [files,setFiles] = useState([]);
    const [previews,setPreviews] = useState([]);
    const {theme} = useContext(ThemeContext)
    






    //functions
    const handleFileChange = (e) =>
        {
            const selectedFiles = Array.from(e.target.files);

            if (selectedFiles.length > 3) {
                alert("You can only upload up to 3 files!");
                e.target.value = ""; // Clear the input
                return;
            }
            setFiles(selectedFiles);
            
            const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
            setPreviews(previewUrls);
        }

    const handleUpload = async() => 
        {
            if(files.length === 0)
                {
                    alert("Please a file to upload");

                    return;
                }
            
                const formData = new FormData();
                files.forEach((file) => formData.append("media", file));

                 // Create the JSON object for the content
                const contentData = {
                    content: caption,
                    location: location, // You can change this to a dynamic value if needed
                };

  // Convert the JSON object to a string and append it to the FormData
  formData.append("content", JSON.stringify(contentData));

                

            try{
                console.log( import.meta.env.VITE_POST_URL)
                const res =  await axios.post(import.meta.env.VITE_POST_URL, formData,  {
                    headers: { 
                        
                        authorization: `bearer ${localStorage.getItem("token")}`
                     },
                });
        
        
                console.log(res.data);
                
            }catch(error)
            {
                alert(error.response.data.message)
            }
      
            
        }

    const handleMediaClick = () =>
        {
            fileInputRef.current.click();
        }

        
        
        
      

  return (
    <div className={`animate__animated animate__slideInLeft create-main ${theme === 'dark' ? "dark" : " "}`}>
    <h1 className="create-head"> Create a post </h1>
    <div className="create-sub">
        <div className="pfp-caption">
            <img src="https://res.cloudinary.com/dxdsrmlcd/image/upload/v1738067039/default_profile_uj539l.png" alt="" className="create-pfp" />
            <input className="create-caption" type="text" value={caption} onChange={(e) => setCaption(e.target.value)} maxLength={32} placeholder="Write a caption.." />
        </div>
        
        
        <input type="text" maxLength={32} className="create-location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter Location">
       
            </input>

        
    <div className="upload-actions">
    <input type="file" 
       accept="image/*, video/*" 
       multiple
       ref={fileInputRef}
        onChange={handleFileChange}></input>

       <div className="upload-action-att" onClick={handleMediaClick}>
        <img src={camera} alt="" />
        <p>Media</p>
       </div>

       <button className="create-upload" onClick={handleUpload}> Upload </button>
    </div>
    <div className="previews">
    {previews.map((preview, index) => (
        files[index].type.startsWith("image/") ? ( 
            <img key={index} src={preview} alt="Preview" width="50" /> 
        ) : ( 
            <video key={index} src={preview} width="50"  /> 
        )
    ))}
</div>
        
    </div>
    </div>
  )
}
