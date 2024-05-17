import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import Footer from "./footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Upperheader from "./upperheader";
import { useDispatch, useSelector } from "react-redux";
import { getpostbyid, postupdate } from "./redux/actions/post";

const Updated=()=>{
  const dispatch=useDispatch();
  const {update}=useSelector((state)=>state.Posts);
    const navigate = useNavigate();
    const {id}=useParams()
    const [logindetail, setLogindetail] = useState({
     title:"",
     description:"",
     image:""
    });
    
    const notify = () => toast("Blog Updated Successfully");
    const [errors, setErrors] = useState({});
    const handlegetbyid=async()=>{    
     dispatch(getpostbyid(id))
     setLogindetail({
      title:update.title,
      description:update.description,
      image:update.image
     })
    }
    const handleSubmit = async() => {
      const formData = new FormData()
      formData.append("title",logindetail.title)
      formData.append("description",logindetail.description)
      formData.append("image",logindetail.image)
     dispatch(postupdate({formData,id,}))
     navigate("/main")
     
  };

  const handleFileChange=(e)=>{
    const file=e.target.files[0];
    setLogindetail({...logindetail,image:file});
  }
  useEffect(()=>{
    handlegetbyid();
  },[])
    return<>
    <Upperheader></Upperheader>
    <div className="cont">
        <div className="body14">
          <div className="blog1 post">Update Post</div>

          <div className="main">
            <div>
              <h1>Update Post</h1>
            </div>
            <div className="Title">
              <input
                className="titl"
                type="text"
                placeholder="title"
                value={logindetail.title}
                onChange={(e) => {
                  setErrors({});
                  setLogindetail({ ...logindetail, title: e.target.value });
                }}
              />
            </div>
            <div className="error">
              {errors.title && (
                <span style={{ color: "red" }}>{errors.title}</span>
              )}
            </div>
            <div className="description">
              
              <textarea
                className="des"
                type="text"
                placeholder="Descirption"
                value={logindetail.description}
                onChange={(e) => {
                  setErrors({});
                  setLogindetail({ ...logindetail, description: e.target.value });
                }}
              />
            </div>
            <div className="error">
              {errors.description && (
                <span style={{ color: "red" }}>{errors.description}</span>
              )}
            </div>
            <div className="file">
              <input
                className="f"
                type="file"
                placeholder="Upload Image"
                onChange={(e)=>handleFileChange(e)}
              />
            </div>
            <div className="b">
              <button className="b5" onClick={()=>{handleSubmit(); notify()}}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
}
export default Updated