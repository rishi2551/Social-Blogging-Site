import React from "react";
import Upperheader from "./upperheader";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { getDatadetail } from "../API/endpoint";
import "./css/blogdetail.css";
import { CommentDo, deletecomment } from "../API/endpoint";
import { MdDelete } from "react-icons/md";
import { RiSendPlaneFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getpostbyid, handlecomments, handledeletecomment } from "./redux/actions/post";
const Blogdetail = () => {
  const { id } = useParams();
  const dispatch=useDispatch()
  const {update}=useSelector((state)=>state.Posts)

  const notify = () => toast("Blog Updated Successfully");
  const [errors, setErrors] = useState({});
 

  const [render, setRender] = useState(false);
  const [docomment, setDocomment] = useState({
    comment: "",
});
console.log(update)
  const comments = async (id) => {
    try {
      
      dispatch(handlecomments({docomment,id}))
      setRender(!render);
      dispatch(getpostbyid(id))  
    } catch (error) {
      console.log(error);
    }
  };
  const commentdelete = async (id, commentId) => {
    try {
      dispatch(handledeletecomment({id,commentId}))
      setRender(!render)
      dispatch(getpostbyid(id))
    } catch (err) {
      console.log(err, "error in delete comment api");
    }
  };
  useEffect(() => {
    dispatch(getpostbyid(id))
  }, [render]);
 
  return (
    <>
      <Upperheader></Upperheader>
      <div className="main-div-detail-page">
        <div>
          <div className="detail-page-main-content">
            <div className="detail-page-main-title">{update.title}</div>

            <div className="detail-page-main-description">
              {update.description}
            </div>

            {/*    
              <div>About blog</div> */}
          </div>
          <div className="detail-page-main-image">
            <img
              className="detail-page-main-img"
              src={`${process.env.REACT_APP_API}/${update.image}`}
              alt=""
            />
          </div>
        </div>
        <div className="main-div-comment">
        <div class="card">
    <div class="chat-header">Comment</div>
      <div class="chat-window">
        <ul class="message-list">{update.comments?.length ? (
                <div>
                  {update.comments.map((showcomment) => {
                    return (
                      <div className="blogdetail-page-show-comment">
                        <div>{showcomment.comment}</div>
                        <div>
                          <MdDelete
                            onClick={() =>
                              commentdelete(update._id, showcomment._id)
                            }
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div  className="blogdetail-div-nocomment">
                  <span >no comment</span>
                </div>
              )}</ul>
      </div>
      <div class="chat-input">
          <input type="text" class="message-input" placeholder="Type your message here"  value={docomment.comment}
              onChange={(e) =>
                setDocomment({ ...docomment, comment: e.target.value })
                
              }/>
          <button class="send-button" onClick={() => comments(update._id)}>Send</button>
      </div>
    </div>
        </div>
      </div>
    </>
  );
};
export default Blogdetail;
