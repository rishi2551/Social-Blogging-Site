import mongoose from "mongoose";

const blogschema=mongoose.Schema({
    users:{
        type:String,
    },
    title:{
        type:String,
        required:true 
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    created_date:{
        type:String
    },
    updated_date:{
        type:String
    },
    liked:{
        type:Boolean,
        default:false
    },
  
    comments:[
        {
            comment:{
            type:String
        },
        created_at:{
            type:Date,
            default:Date.now
        }

    }
    ],
    
})
export const Blog=mongoose.model("Blog",blogschema);