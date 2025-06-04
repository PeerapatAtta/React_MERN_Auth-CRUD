import NavbarComponent from "./components/NavbarComponent";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [blogs, setBlogs] = useState([]);

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/blogs`)
      .then((response) => {
        setBlogs(response.data);
      })
      .catch(err=>alert(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container p-5">
      <NavbarComponent />
      {blogs.map((blog,index)=>(
        <div key={index} className="card mb-3">
          <div className="card-body">
            <h2 className="card-title">{blog.title}</h2>
            <p className="card-text">{blog.content.substring(0,250)}</p>
            <p className="card-text"><small className="text-muted">Author: {blog.author}, publish: {new Date(blog.createdAt).toLocaleString()}</small></p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
