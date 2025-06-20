import NavbarComponent from "./components/NavbarComponent";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import parse from "html-react-parser";
import { getUser, getToken } from "./services/authorize"; // Need to check user authentication

function App() {
  const [blogs, setBlogs] = useState([]);

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/blogs`)
      .then((response) => {
        setBlogs(response.data);
      })
      .catch(err => alert(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const confirmDelete = (slug) => {
    Swal
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteBlog(slug);
        }
      });
  }

  const deleteBlog = (slug) => {

    axios
      .delete(`${process.env.REACT_APP_API}/blog/${slug}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}` // ส่ง token สำหรับการยืนยันตัวตน
          }
        }
      )
      .then((response) => {
        Swal.fire(
          'Deleted!',
          response.data.message,
          'success'
        );
        fetchData(); // Refresh the blog list after deletion
      })
      .catch(err => alert(err));
  }

  return (
    <div className="container p-5">
      <NavbarComponent />
      {blogs.map((blog, index) => (
        <div key={index} className="card mb-3">
          <div className="card-body">
            <Link to={`/blog/${blog.slug}`} className="text-decoration-none text-dark">
              <h2 className="card-title">{blog.title}</h2>
            </Link>
            <p className="card-text">{parse(blog.content.substring(0, 250))}</p>
            <p className="card-text"><small className="text-muted">Author: {blog.author}, publish: {new Date(blog.createdAt).toLocaleString()}</small></p>

            {getUser() && (
              <div>
                <Link className="btn ms-2 btn-outline-success" to={`/blog/edit/${blog.slug}`}>Update</Link>
                <button className="btn ms-2 btn-outline-danger" onClick={() => confirmDelete(blog.slug)} >Delete</button>
              </div>
            )}


          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
