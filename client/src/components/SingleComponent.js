import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import NavbarComponent from "./NavbarComponent"; // Import NavbarComponent
import parse from "html-react-parser"; // Import parse for HTML content

const SingleComponent = () => {
    const [blog, setBlog] = useState({ title: '', content: '', author: '', createdAt: '' }); // Initialize blog state
    const { slug } = useParams(); // Get slug param

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_API}/blog/${slug}`)
        .then((response) => {
            setBlog(response.data);
        })
        .catch((error) => alert('Error fetching blog data:', error));
    }, [slug]);

    return (
        <div className="container p-5">
            <NavbarComponent/>
            <h1>{blog.title}</h1>
            <p>{parse(blog.content)}</p>
            <p className="card-text"><small className="text-muted">Author: {blog.author}, publish: {new Date(blog.createdAt).toLocaleString()}</small></p>
        </div>
    );
}

export default SingleComponent;
