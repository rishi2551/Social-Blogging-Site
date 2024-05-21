import React, { useEffect, useState,useRef } from "react";
import "./css/userprofile.css";
import coverimage from "../image/pexels-photo-355747.jpeg";
// import profile from "../image/man_5-1024.webp";
// import { ImCancelCircle } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";
import { coverphotohandle, getpost, profilehandle, profilephotohandle, updateprofileuser } from "./redux/actions/post";
// import { getprofile ,updateuserprofile, userprofilepic,usercoverpic} from "../API/endpoint";
import { useDispatch, useSelector } from "react-redux";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
// import Header from "./header";
const Userprofile = () => {
  
  const [showfirstcode, setShowfirstcode] = useState(true);
  const [profiledata, setProfiledata] = useState({});
  const dispatch=useDispatch()
  const {posts}=useSelector((state)=>state.Posts)
  const {Profile}=useSelector((state)=>state.Posts)
  const togglecode = () => {
    setShowfirstcode(!showfirstcode);
  };
  const [updateprofile, setUpdatedata] = useState({
    username: "",
    email: "",
    mobileNo: "",
    country: "",
    state: "",
    zipcode: "",
    // coverPhoto:"",
    // profilePhoto:""
  });
  const[profilepic,setProfilepic]=useState({});
  const[coverpic,setCoverpic]=useState({});
  const [errors, setErrors] = useState({});
console.log(Profile.user)
  const profileId = localStorage.getItem("userId");

  const fetchprofile = async () => {
    try {
      dispatch(profilehandle({profileId}))
      // console.log(res, "dsjjddh");
      setProfiledata(Profile.user);
      setUpdatedata({
        username: Profile.user.username,
        email: Profile.user.email,
        mobileNo:Profile.user.mobileNo,
        country: Profile.user.country,
        state: Profile.user.state,
        zipcode: Profile.user.zipcode,
        // coverPhoto:res.data.user.coverPhoto,
        // profilePhoto:res.data.user.profilePhoto
      });
      console.log(Profile.user);
    } catch (err) {
      console.log(err);
    }
  };

 
  const handlesaveupdate=async()=>{
    const error={}
    try{
     dispatch(updateprofileuser({updateprofile,profileId}))
      setShowfirstcode(!showfirstcode); 
      // dispatch(profilehandle({profileId}))
    }catch(err){
      console.log(err,"error in api")
    }
  }
  const handleprofile=async()=>{
    try{
      const formData=new FormData()
      formData.append("profilePhoto",profilepic)
    dispatch(profilephotohandle({formData,profileId}))
    fetchprofile()
    }catch(err){
      console.log(err,"error in api")
    }
  }
  const handlecoverphoto=async()=>{
    try{
      const formData=new FormData()
      formData.append("coverPhoto",coverpic)
    dispatch(coverphotohandle({formData,profileId}))
    setShowfirstcode(!showfirstcode);
    fetchprofile()
    }catch(err){
      console.log(err,"error in api")
    }
  }
  useEffect(() => {
    dispatch(profilehandle({profileId}))
    fetchprofile()
    dispatch(getpost())
  }, [showfirstcode]);
  // console.log(profiledata, "dfskdjfk");
  return (
    <>
      {showfirstcode ? (
        <div className="background">
          <div className="cover-image">
            <img src={`https://adventure-archive-br4b.onrender.com/${Profile.user?.coverPhoto}`} className="cover-img" alt="" />
          </div>
          <div className="profile-main-div">
            <div className="profile-image1">
              <img
                src={`https://adventure-archive-br4b.onrender.com/${Profile.user?.profilePhoto}`}
                className="profile-img"
                alt=""
              />
            </div>
            <div className="user-ka-name">{Profile.user?.username}</div>
          </div>
          <div className="TOP-HEADING">
            <h1>USER INFORMATION</h1>
          </div>
          <div className="slider-image-user-page">
          <div className="personal-imformation-div">
            <div className="title-div">
              <h2>User Profile</h2>{" "}
            </div>
            <div>
              <div className="heading">Email</div>
              <div className="EMAIL-DIV">{Profile.user?.email}</div>
            </div>
            <div>
              <div className="heading">Personal Contact</div>

              <div className="EMAIL-DIV">{Profile.user?.mobileNo}</div>
            </div>
            <div>
              <div className="heading">Country</div>

              <div className="EMAIL-DIV">{Profile.user?.country}</div>
            </div>
            <div>
              <div className="heading">State</div>

              <div className="EMAIL-DIV">{Profile.user?.state}</div>
            </div>
            <div>
              <div className="heading"> Zipcode</div>

              <div className="EMAIL-DIV">{Profile.user?.zipcode}</div>
            </div>
            <div className="EDIT-DIV">
              <button className="EDIT-BUTTON" onClick={togglecode}>
                Edit Profile
              </button>
            </div>
          </div>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <div>
         {posts?.map((item, index) => {
            return <SwiperSlide>
            <img src={`https://adventure-archive-br4b.onrender.com/${item.image}`} />
          </SwiperSlide>
          })}</div>
      
       
      </Swiper>
      </div>
        </div>
      ) : (
        <div className="background2">
          <div className="cancelicon-div">
          < RxCross1 className="cancelicon" onClick={()=>togglecode()} />
          </div>
          <div className="update-container-div">
            <div className="title-div">
              <h2>User Profile</h2>{" "}
            </div>
            <div>
              <div className="heading">UserName</div>
              <div className="EMAIL-DIV">
                <input
                  className="EMAIL-DIV"
                  type="text"
                  placeholder="Username"
                  value={updateprofile.username}
                  onChange={(e)=>{
                    setErrors({});
                    setUpdatedata({...updateprofile, username:e.target.value})
                  }}
                />
              </div>
              <div className="heading">Email</div>
              <div className="EMAIL-DIV">
                <input
                  className="EMAIL-DIV"
                  type="text"
                  placeholder="email"
                  value={updateprofile.email}
                  onChange={(e)=>{
                    setErrors({});
                    setUpdatedata({...updateprofile,email:e.target.value})
                  }}
                />
              </div>
            </div>
            <div>
              <div className="heading">Personal Contact</div>

              <div className="EMAIL-DIV">
                <input
                  className="EMAIL-DIV"
                  type="text"
                  placeholder="Personal Contact"
                  value={updateprofile.mobileNo}
                  onChange={(e)=>{
                    setErrors({});
                    setUpdatedata({...updateprofile,mobileNo:e.target.value})
                  }}
                />
              </div>
            </div>
            <div>
              <div className="heading">Country</div>

              <div className="EMAIL-DIV">
                <input
                  className="EMAIL-DIV"
                  type="text"
                  placeholder="Country"
                  value={updateprofile.country}
                  onChange={(e)=>{
                    setErrors({});
                    setUpdatedata({...updateprofile,country:e.target.value})
                  }}
                />
              </div>
            </div>
            <div>
              <div className="heading">State</div>

              <div className="EMAIL-DIV">
                <input
                  className="EMAIL-DIV"
                  type="text"
                  placeholder="State"
                  value={updateprofile.state}
                  onChange={(e)=>{
                    setErrors({});
                    setUpdatedata({...updateprofile,state:e.target.value})
                  }}
                />
              </div>
            </div>
            <div>
              <div className="heading"> Zipcode</div>

              <div className="EMAIL-DIV">
                <input
                  className="EMAIL-DIV"
                  type="text"
                  placeholder="Zipcode"
                  value={updateprofile.zipcode}
                  onChange={(e)=>{
                    setErrors({});
                    setUpdatedata({...updateprofile,zipcode:e.target.value})
                  }}
                />
              </div>
            </div>
            <div>
              <div className="heading"> Profile Photo</div>

              <div className="EMAIL-DIV">
                <input
                  className="EMAIL-DIV"
                  type="file"
                  placeholder="profile Photo"
                  // value={updateprofile.profilePhoto}
                  onChange={(e)=>{
                    if(e.target.files.length){
                      const selectedFile=e.target.files[0];
                      console.log(selectedFile,"qwertyui")
                      setProfilepic(selectedFile)
                    }
                    else{
                      setProfilepic({})
                    }
                  }}
                />
              </div>
            </div>
            <div>
              <div className="heading"> Cover Photo</div>

              <div className="EMAIL-DIV">
                <input
                  className="EMAIL-DIV"
                  type="file"
                  placeholder="cover photo"
                  // value={updateprofile.coverPhoto}
                  onChange={(e)=>{
                    if(e.target.files.length){
                      const selectedFile=e.target.files[0];
                      console.log(selectedFile,"qwertyui")
                      setCoverpic(selectedFile)
                    }
                    else{
                      setCoverpic({})
                    }
                  }}
                />
              </div>
            </div>
            <div className="EDIT-DIV">
              <button className="EDIT-BUTTON" onClick={()=>{handleprofile() ;handlesaveupdate();handlecoverphoto(); }}>save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Userprofile;
