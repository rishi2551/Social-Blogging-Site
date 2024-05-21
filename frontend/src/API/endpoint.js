import axios from "axios";

const BASE_URL = "http://localhost:7061";
const token = localStorage.getItem("token");
const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    // "Content-Type": "application/json",
  },
});
API.interceptors.response.use(
  async(res)=>{
    return res;
  },
  (error)=>{
    if(error.response?.status === 401){
      throw error;
    }
    throw error;
  }
);

export const addblog = (formData) => API.post("blog/createblog",formData);
export const getData = () => API.get("/blog/getpost");
export const getDatadetail = (id) => API.get(`/blog/postblog/${id}`);
export const signupdetail =(signupdata)=> API.post("/auth/signup",signupdata)
export const logindetail =(logindata)=> API.post("/auth/login",logindata)
export const deletepost =(id)=> API.delete(`/blog/deletepost/${id}`)
export const updatepost=(formdata,id)=>API.put(`/blog/updateblog/${id}`,formdata)
export const UpdatewithPatch=(id,updated)=>API.patch(`/blog/update/${id}`,updated);

// post comment api 
export const CommentDo=(comment,id)=> API.post(`/blog/postblog/${id}/comment`,comment)
//comment delete api 
export const deletecomment=(id,commentId)=>API.delete(`/blog/postblog/${id}/comment/${commentId}`)


export const getprofile=(userId)=>API.get(`/auth/profile/${userId}`)

export const updateuserprofile=(profiledata,userId)=>API.put(`/auth/profile/${userId}`,profiledata)

export const userprofilepic=(profilepicdata,userId)=>API.patch(`/auth/profile/${userId}`,profilepicdata)

export const usercoverpic=(coverpicdata,userId)=>API.patch(`/auth/profilecoverphoto/${userId}`,coverpicdata)

export const forgotpassword=(email)=>API.post(`/auth/send-mail`,email)

export const resetpassword=(email,resetpassworddata)=>API.post(`/auth/reset-password/${email}`,resetpassworddata)

export const filterAPI=(title,created_date)=>API.get(`/blog/filter?title=${title}&created_date=${created_date}`)

export const searchAPI=(searchdata)=>API.get(`/blog/search?searchtext=${searchdata}`)

export const changepasswordapi=(passworddata,userId)=>API.patch(`/auth/change-password/${userId}`,passworddata)