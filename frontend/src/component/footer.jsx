import "./css/footer.css";
import { MdCopyright } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
const Footer = () => {
  return (
    <>
      <div className="container3 end-header">
        <div className=" body1 end-inside-header">
          <div className="training-blog">
            <div className="training">
              Training
              <div className="blog">Blog</div>
            </div>
            <div className="training-blog-content">
              Welcome to our technicalblog. where we delve into The world of
              cutting-edge technologies and explore their practical aplication.
            </div>
          </div>
          <div className="category">
            <div>
              <ul style={{ fontWeight: "bold" }}>CATEGORY</ul>
              <div className="list">
                <ul>HTML</ul>
                <ul>CSS</ul>
                <ul>JAVASCRIPT</ul>
                <ul>VS CODE</ul>
              </div>
            </div>
          </div>
          <div className="get-in-touch">
            <div>
              <ul style={{ fontWeight: "bold" }}>GET IN TOUCH</ul>
              <div className="list">
                <ul>+91-9XXX-XXX-XXX</ul>
                <ul>demo@gmail.com</ul>
              </div>
            </div>
          </div>
          <div className="follow-us-on">
            <div>
              <ul style={{ fontWeight: "bold" }}>FOLLOW US ON</ul>
              <div className="follow-us-icon">
                <ul className="list2">
                  <li>
                    {" "}
                    <FaInstagram />
                  </li>
                  <li>
                    {" "}
                    <FaTwitter />
                  </li>
                  <li>
                    {" "}
                    <FaLinkedinIn />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="body1 end">
          <div className="end-training">
            <div className="copyright">
              <MdCopyright />
            </div>
            <div>2024 TRAININGBLOG</div>
          </div>
          <div>
            MADE BY RISHI{/*&#129505 */} <FcLike /> MOHALI,INDIA
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
