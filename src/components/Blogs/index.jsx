// Write your JS code here
import { Link } from "react-router-dom";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import Cookies from "js-cookie";
import "./index.css";
import { useState } from "react";

const Blogs = ({ data, getBlogs }) => {
  const { _id, Title, Image, Author, Topic, Content } = data;
  const token = Cookies.get("jwt_token");
  const [blogData, setBlogData] = useState({
    title: Title,
    author: Author,
    topic: Topic,
    content: Content,
  });

  const handleOnChange = (e) => {
    setBlogData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmitEditBlog = async (e) => {
    e.preventDefault();
    const url = `https://zuai-backend-bn33.onrender.com/posts/${_id}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(blogData),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    alert(data.message);
    getBlogs();
  };

  const onDeleteBlog = async (id) => {
    const url = `https://zuai-backend-bn33.onrender.com/posts/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    getBlogs();
    alert(data.message);
  };

  return (
    <div className="blog-card">
      <Link to={`/blog/${_id}`} className="item-link">
        <img src={Image} alt={`item${_id}`} className="image" />
        <div className="blog-details">
          <p className="blog-topic">{Topic}</p>
          <h1 className="blog-title">{Title}</h1>
          <div className="author-details">
            <p className="author-name">{Author}</p>
          </div>
          <div className="d-flex ">
            <button
              type="button"
              className="btn btn-outline-success me-3"
              data-bs-toggle="modal"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              data-bs-target={`#EditBlogModal${_id}`}
            >
              <MdModeEditOutline /> Edit Blog
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDeleteBlog(_id);
              }}
            >
              <MdDelete /> Delete Blog
            </button>
          </div>
        </div>
      </Link>
      <>
        <div
          className="modal fade"
          id={`EditBlogModal${_id}`}
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={onSubmitEditBlog}>
              <div className="modal-header">
                <h1 className="modal-title fs-5 ms-auto" id="exampleModalLabel">
                  Edit Blog Details
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="w-75 p-1 rounded border mb-3"
                  placeholder="Blog Title"
                  name="title"
                  value={blogData.title}
                  onChange={handleOnChange}
                />
                <input
                  type="text"
                  className="w-75 p-1 rounded border mb-3"
                  placeholder="Blog Author"
                  name="author"
                  value={blogData.author}
                  onChange={handleOnChange}
                />
                <input
                  type="text"
                  className="w-75 p-1 rounded border mb-3"
                  placeholder="Blog Topic "
                  value={blogData.topic}
                  name="topic"
                  onChange={handleOnChange}
                />
                <textarea
                  className="w-75 p-1 rounded border mb-3"
                  placeholder="Blog Content"
                  value={blogData.content}
                  name="content"
                  onChange={handleOnChange}
                  rows={5}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Update Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    </div>
  );
};
export default Blogs;
