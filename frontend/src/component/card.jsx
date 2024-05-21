import React from "react";
import { MdDelete } from "react-icons/md";
import "./css/blogpost.css";
import { useState, useEffect } from "react";
import Popup from "reactjs-popup";
// import { getprofile } from "../API/endpoint";
import "reactjs-popup/dist/index.css";
import { RiSendPlaneFill } from "react-icons/ri";
import { CiMenuKebab } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import { CommentDo, deletecomment, deletepost } from "../API/endpoint";
import { FaHeart, FaRegHeart, FaRegShareSquare } from "react-icons/fa";
import { UpdatewithPatch } from "../API/endpoint";
import { useDispatch, useSelector } from "react-redux";
import {
  postdelete,
  getpost,
  handledeletecomment,
  handlecomments,
  profilehandle,
} from "./redux/actions/post";
// import { TiDeleteOutline } from "react-icons/ti";
// import { HiPencilSquare } from "react-icons/hi2";
const Card = ({ item, render, setRender }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Profile } = useSelector((state) => state.Posts);
  const profileId = localStorage.getItem("userId");
  // const getprofiledetails=async()=>{
  //   try{
  //     // const res=await getprofile(profileId)

  //     dispatch(handleprofile({profileId}))
  //     setProfiledata(Profile.user)
  //     fetchdata()
  //   }catch(err){
  //     console.log(err,"qwertyuio")
  //   }

  // }

  // const [commentbox, setCommentbox] = useState(false);
  const [docomment, setDocomment] = useState({
    comment: "",
  });
  const comments = async (id) => {
    try {
      dispatch(handlecomments({ docomment, id }));
      // alert("comment successfully");
      setRender(!render);
    } catch (error) {
      console.log(error);
    }
  };
  const handledelete = async (id) => {
    try {
      dispatch(postdelete(id));
      dispatch(getpost());
    } catch (err) {
      console.log(err);
    }
  };
  const commentdelete = async (id, commentId) => {
    try {
      dispatch(handledeletecomment({ id, commentId }));
      setRender(!render);
      dispatch(getpost());
    } catch (err) {
      console.log(err, "error in delete comment api");
    }
  };
  // const togglecomment = async () => {
  //   if (commentbox === true) {
  //     setCommentbox(false);
  //   } else {
  //     setCommentbox(true);
  //   }
  // };\

  const toggleLike = async (postId) => {
    try {
      await UpdatewithPatch({ liked: !item.liked }, postId);
      setRender(!render);
      dispatch(getpost());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(profilehandle({ profileId }));
  }, []);
  useEffect(() => {
    dispatch(getpost());
  }, [render]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const createdDate = new Date(item.created_date);
  let date = createdDate.getDate();
  let monthindex = createdDate.getMonth();
  let month = months[monthindex];
  let year = createdDate.getFullYear();
  let currentdate = `${date}-${month}-${year}`;
  return (
    <>
      <div className="one-container">
        <div className="main-container" key={item._id}>
          
            <div className="main-delete-icon">
              {/* <Popup
                contentStyle={{ width: "50px" }}
                trigger={
                  <div className="menu-div">
                    <CiMenuKebab />
                  </div>
                }
                position="bottom right"
              >
                <div className="menu-div">
                  <div
                    className="delete-icon"
                    onClick={() => handledelete(item._id)}
                  >
                    <button className="noselect123456">
                      <span className="text123456">Delete</span>
                      <span className="icon123456">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
                        </svg>
                      </span>
                    </button>
                  </div>
                  <div onClick={() => navigate(`/update/${item._id}`)}>
                    Update
                  </div>
                </div>
              </Popup> */}
              <label className="popup">
  <input type="checkbox" />
  <div className="burger" tabIndex={0}>
    <span />
    <span />
    <span />
  </div>
  <nav className="popup-window">
    <ul>
      <li>
        <button onClick={()=>navigate(`/update/${item._id}`)}>
          <svg
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            height={14}
            width={14}
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="16 3 21 8 8 21 3 21 3 16 16 3" />
          </svg>
          <span>Edit</span>
        </button>
      </li>
      <hr />
      <li>
        <button  onClick={() => handledelete(item._id)}>
          <svg
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            height={14}
            width={14}
            xmlns="http://www.w3.org/2000/svg"
          >
            <line y2={18} x2={6} y1={6} x1={18} />
            <line y2={18} x2={18} y1={6} x1={6} />
          </svg>
          <span>Delete</span>
        </button>
      </li>
    </ul>
  </nav>
</label>

            </div>
            <div onClick={() => navigate(`/blogdetail/${item._id}`)}>
            <div className="main-image">
              <img
                className="main-img"
                src={`https://adventure-archive-br4b.onrender.com/${item.image}`}
                alt="profile"
              />
            </div>
            <div className="card-title">
              <div className="title">
                <h2>{item.title}</h2>
              </div>
              <div className="description2">{item.description}</div>
            </div>
            <div className="profile-image">
              <div className="i1">
                <img
                  className="image-top-inside-header"
                  src={`https://adventure-archive-br4b.onrender.com/${Profile?.user?.profilePhoto}`}
                  alt="profile"
                />
              </div>

              <div className="profile">
                <div className="sam">{Profile?.user?.username}</div>
                <div className="jan">{currentdate}</div>
              </div>
            </div>
          </div>
          <div className="icons">
            <div className="heart">
              {item.liked ? (
                <FaHeart
                  className="like"
                  style={{ color: "red" }}
                  onClick={() => toggleLike(item._id)}
                />
              ) : (
                <FaRegHeart
                  className="like"
                  onClick={() => toggleLike(item._id)}
                />
              )}{" "}
              like
            </div>
            {/* <div className="comment" onClick={() => togglecomment()}>
              <FaRegCommentDots className="comment" />
              Comment
            </div> */}

            <Popup
              trigger={
                <div className="lc">
                  {" "}
                  <FaRegCommentDots /> Comment
                </div>
              }
              position="bottom center"
            >
              <div>
                <div>
                  {item.comments.length ? (
                    <span>
                      {item.comments.map((showcomment) => {
                        return (
                          <div className="flex-comment">
                            <div>{showcomment.comment}</div>
                            <div>
                              <MdDelete
                                onClick={() =>
                                  commentdelete(item._id, showcomment._id)
                                }
                              />
                            </div>
                          </div>
                        );
                      })}
                    </span>
                  ) : (
                    <span>no comment</span>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Enter Comment"
                  value={docomment.comment}
                  onChange={(e) =>
                    setDocomment({ ...docomment, comment: e.target.value })
                  }
                  className="comment-bar"
                ></input>
                <RiSendPlaneFill onClick={() => comments(item._id)} />{" "}
              </div>
            </Popup>
            <div className="share">
              <FaRegShareSquare></FaRegShareSquare> Share
            </div>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Card;
