import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const BlogItemDetails = () => {
  const [blog, setBlog] = useState({});
  const token = Cookies.get("jwt_token");

  const { id } = useParams();

  useEffect(() => {
    const getPost = async () => {
      const url = `https://zuai-backend-bn33.onrender.com/posts/${id}`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      setBlog(data);
    };
    getPost();
  }, []);

  return (
    <div className="d-flex justify-content-center vw-100">
      <div className="blog-info-card text-center">
        <div className="blog-info">
          <h2 className="blog-details-title">{blog.Title}</h2>
          <div className="author-details">
            <p className="details-author-name">{blog.Author}</p>
          </div>
          <img className="blog-image" src={blog.Image} alt={blog.Title} />
          <p className="blog-content">{blog.Content}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogItemDetails;
