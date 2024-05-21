import { createAsyncThunk } from "@reduxjs/toolkit";
import {  CommentDo, addblog, changepasswordapi, deletecomment, deletepost, filterAPI, getData, getDatadetail, getprofile, searchAPI, updatepost, updateuserprofile, usercoverpic, userprofilepic } from "../../../API/endpoint";
import Userprofile from "../../user-profile";
import Changepassword from "../../changepassword";

export const getpost=createAsyncThunk("blog/getpost",async()=>{
    try {
        const res=await getData()
        return res.data
    } catch (error) {
        console.log(error)
    }
})
export const createpost=createAsyncThunk("blog/createpost",async(formdata)=>{
    try {
        const res=await addblog(formdata)
        return res.data;
    } catch (error) {
        console.log(error)
    }
})
export const getpostbyid=createAsyncThunk("blog/getpostbyid",async(id)=>{
    try{
        const res=await getDatadetail(id)
        return res.data
    }
    catch(err){
        console.log(err,"error in this get by id")
    }
})
export const postupdate=createAsyncThunk("blog/postupdate",async({formData,id})=>{
    try {
        const res=await updatepost(formData,id)
        return res
    } catch (error) {
        console.log(error,"error in update")     
    }
})
export const postdelete=createAsyncThunk("blog/deletepost",async(id)=>{
    try {
        const res=await deletepost(id)
        return res.data 
    } catch (error) {
        console.log(error)
    }
})
export const handlecomments=createAsyncThunk("blog/handlecomments",async({docomment,id})=>{

    try {
        const res=await CommentDo(docomment,id)
        return res.data
    } catch (error) {
        console.log(error)
    }
})
export const handledeletecomment=createAsyncThunk("blog/handledeletecomment",async({id,commentId})=>{
 
    try {
        const res=await deletecomment(id,commentId)
        return res
    } catch (error) {
        console.log(error)
    }
})
export const profilehandle=createAsyncThunk("blog/handleprofile",async({profileId})=>{
    try {
        const res=await getprofile(profileId)
        return res.data
    } catch (error) {
        console.log(error)
    }
})
export const handlefilter=createAsyncThunk("blog/handlefilter",async({title,created_date})=>{
    try {
        const res=await filterAPI(title,created_date)
        return res.data;
    } catch (error) {
        console.log(error)
    }
})
export const handlesearch=createAsyncThunk("blog/handlesearch",async(text)=>{
    try {
        const res=await searchAPI(text)
        return res.data;
    } catch (error) {
        console.log(error)
    }
})
export const handlesearchchange=createAsyncThunk("blog/handlesearchchange",async(text)=>{
    try {
        const res=await searchAPI(text)
        return res.data;
    } catch (error) {
        console.log(error)
    }
})
export const updateprofileuser=createAsyncThunk("blog/updateprofileuser",async({updateprofile,profileId})=>{
    console.log(profileId)
    console.log(updateprofile)
    try {
        const res=await updateuserprofile(updateprofile,profileId)
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const coverphotohandle=createAsyncThunk('/blog/coverphotohandle',async({formData,profileId})=>{
    console.log(profileId)
    console.log(formData)
    try{
        const res=await usercoverpic(formData,profileId)
        return res.data
    }
    catch(err){
        console.log(err)
    }
})
export const profilephotohandle=createAsyncThunk('/blog/profilephotohandle',async({formData,profileId})=>{
    console.log(profileId)
    console.log(formData)
    try{
        const res=await userprofilepic(formData,profileId)
        return res.data
    }
    catch(err){
        console.log(err)
    }
})
export const handlechangepassword=createAsyncThunk('/blog/handlechangepassword',async({passworddata,userId})=>{
    console.log(passworddata,"4565885")
    console.log(userId,"64814")
    try {
        const res=await changepasswordapi(passworddata,userId)
        return res.data
    } catch (error) {
        console.log(error)        
    }
})