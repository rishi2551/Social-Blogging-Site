import "./css/header.css";
import { Link, useNavigate } from "react-router-dom";
// import { filterAPI, getData, getprofile, searchAPI } from "../API/endpoint";
import logo from "../image/adventure-archive-high-resolution-logo-transparent (1).png";
import logo1 from "../image/2406722-removebg.png"
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getpost,
  handlefilter,
  handlesearch,
  handlesearchchange,
  profilehandle,
} from "./redux/actions/post";
const Header = () => {
  
  const profileId = localStorage.getItem("userId");
  const [title, setTitle] = useState("");
  const [created_date, setCreateddate] = useState([]);
  const [searchdata, setSearchdata] = useState({});
  const { posts } = useSelector((state) => state.Posts);
  const { allposts } = useSelector((state) => state.Posts);
  const { searchby } = useSelector((state) => state.Posts);

  const { Profile } = useSelector((state) => state.Posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const search = async (text) => {
    try {
      dispatch(handlesearch(text));
    } catch (err) {
      console.log(err);
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
 
  };

  useEffect(() => {
    dispatch(profilehandle({ profileId }));
    dispatch(getpost());
  }, []);
  useEffect(() => {
    search();
  }, []);
  useEffect(() => {
    dispatch(handlefilter({ title, created_date }));
  }, [title, created_date]);

  return (
    <>
      <header className="header">
        <div className="container3">
          <div className="inside-header">
            <div
              className="right-top-inside-header"
              onClick={() => navigate("/main")}
            >
              <img className="logo-image1" src={logo1} alt="" />
               <img className="logo-image" src={logo} alt="" /> 
            </div>
            <div className="left-top-inside-header">
              <div className="image-inside-header">
                <img
                  class="image-top-inside-header-profile"
                  src={`https://adventure-archive-76s9.onrender.com/${Profile?.user?.profilePhoto}`}
                />
              </div>
              {/* <div className="name">
                <select
                  className="username-select"
                  name="Rishisambhi"
                  onClick={() => navigate("/userprofile")}
                >
                  <option value="" disabled="" selected="">
                    {Profile?.user?.username}
                  </option>
                </select>
              </div> */}
              <div class="paste-button">
                <button class="button-username">
                  {Profile?.user?.username}▼
                </button>
                <div class="dropdown-content">
                  <Link id="top" to="/userprofile">
                    {Profile?.user?.username}
                  </Link>
                  <Link id="middle" to={`/changepassword/${profileId}`}>
                    Change Password
                  </Link>
                  <Link id="bottom" to="/" onClick={()=>logout()} >
                    LogOut
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="bottom-header">
            <div className="inside-header2 bottom-inside-header">
              <div className="filter">Filter</div>
              <div className="input-div-header-filter">
                <div className="t">
                  <div className="t1">
                    <div className="created">Title</div>
                    <div>
                      <select
                        className="select"
                        name="ALL"
                        value={title}
                        onChange={(e) =>
                          setTitle(
                            e.target.value == "All" ? "" : e.target.value
                          )
                        }
                      >
                        <option value="" disabled="" selected="">
                          All
                        </option>

                        {allposts?.map((item) => {
                          return (
                            <option value={item.title}>{item.title}</option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="t2">
                    <div className="published">Published Date</div>
                    <div>
                      <input
                        type="date"
                        className="select"
                        onChange={(e) => setCreateddate(e.target.value)}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="t3">
                  <div className="search">Search</div>
                  <Popup
                    contentStyle={{ width: "150px" }}
                    trigger={
                      <div>
                        <div className="search">
                          <input
                            placeholder="Search..."
                            type="text"
                            onChange={(e) => {
                              const updatedText = e.target.value;
                              search(updatedText);
                              setSearchdata(updatedText);
                            }}
                          />
                          <button
                            type="submit"
                            onClick={(e) =>
                              dispatch(handlesearchchange(searchdata))
                            }
                          >
                            Go
                          </button>
                        </div>
                      </div>
                    }
                    position="bottom center"
                  >
                    <div>
                      {searchby?.map((item) => {
                        return (
                          <div
                            onClick={(e) => navigate(`/blogdetail/${item._id}`)}
                          >
                            {item.title}
                          </div>
                        );
                      })}
                    </div>
                  </Popup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
