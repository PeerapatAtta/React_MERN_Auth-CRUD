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
      {JSON.stringify(blogs)}
    </div>
  );
}

export default App;
