import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaPlus } from "react-icons/fa";
import "./index.css";
import Blogs from "../Blogs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blogsList, addBlog } from "../../redux/action";

const Home = () => {
  const jwtToken = Cookies.get("jwt_token");
  const blogs = useSelector((state) => state.blogsData || []);
  const dispatch = useDispatch();

  const [blogDetails, setBlogDetails] = useState({
    title: "",
    author: "",
    topic: "",
    content: "",
    image: null,
  });

  const getBlogs = async () => {
    try {
      const url = "https://zuai-backend-bn33.onrender.com/posts";
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        console.log("Failed to fetch blogs");
      }
      const data = await response.json();
      dispatch(blogsList(data));
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, [dispatch]);

  const handleOnChange = (e) => {
    setBlogDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnImageChange = (e) => {
    setBlogDetails((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const onAddBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blogDetails.title);
    formData.append("author", blogDetails.author);
    formData.append("topic", blogDetails.topic);
    formData.append("image", blogDetails.image);
    formData.append("content", blogDetails.content);

    const url = "https://zuai-backend-bn33.onrender.com/posts";
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: formData,
    };
    const response = await fetch(url, options);
    const data = await response.json();
    setBlogDetails({
      title: "",
      author: "",
      image: null,
      content: "",
      topic: "",
    });
    dispatch(addBlog(data));
    getBlogs();
  };

  const AddBlog = () => {
    return (
      <>
        <div className="w-100 d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#blogModal"
          >
            <FaPlus className="me-2" />
            Add New Blog
          </button>
        </div>

        <div
          className="modal fade"
          id="blogModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={onAddBlog}>
              <div className="modal-header">
                <h1 className="modal-title fs-5 ms-auto" id="exampleModalLabel">
                  Enter Blog Details
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
                  value={blogDetails.title}
                  onChange={handleOnChange}
                />
                <input
                  type="text"
                  className="w-75 p-1 rounded border mb-3"
                  placeholder="Blog Author "
                  name="author"
                  value={blogDetails.author}
                  onChange={handleOnChange}
                />
                <input
                  type="text"
                  className="w-75 p-1 rounded border mb-3"
                  placeholder="Blog Topic "
                  value={blogDetails.topic}
                  name="topic"
                  onChange={handleOnChange}
                />
                <textarea
                  className="w-75 p-1 rounded border mb-3"
                  placeholder="Blog Content"
                  value={blogDetails.content}
                  name="content"
                  onChange={handleOnChange}
                  rows={5}
                />
                <input
                  type="file"
                  className="w-75 p-1 rounded border mb-3"
                  onChange={handleOnImageChange}
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
                  Add Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  };

  if (jwtToken === undefined) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <h1 className="text-center">Welcome to blogs list</h1>
      {AddBlog()}
      <div className="row">
        <ul className="container mt-5 blogs w-100 d-flex flex-column align-items-center">
          {blogs.map((each) => (
            <Blogs key={each._id} data={each} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
