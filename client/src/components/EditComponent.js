import { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom"; // Import useParams
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { getToken } from "../services/authorize"; // นำเข้า getUser เพื่อตรวจสอบสถานะการล็อกอินของผู้ใช้

const EditComponent = () => {
    // กำหนดค่าเริ่มต้นให้กับ state
    const [state, setState] = useState({
        title: "",
        author: "",
        slug: ""
    });
    const { title, author } = state;

    // แยก state สำหรับ content เนื่องจากใช้ ReactQuill
    const [content, setContent] = useState("");
    // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงใน ReactQuill
    const submitContent = (event) => {
        setContent(event); // อัพเดตค่า content ใน state
    }

    const { slug } = useParams(); // Get slug param

    // ใช้ useEffect เพื่อดึงข้อมูลจาก API เมื่อคอมโพเนนต์ถูกเรนเดอร์
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/blog/${slug}`)
            .then((response) => {
                console.log(response.data);
                const { title, content, author, slug } = response.data;
                setState({ title, content, author, slug }); // Set title, author, and slug in state               
                setContent(content); // Set content for ReactQuill
            })
            .catch((error) => alert('Error fetching blog data:', error));
    }, [slug]);

    // ฟังก์ชันสำหรับแสดงฟอร์มอัพเดต
    const showUpdateForm = () => (
        <form onSubmit={submitForm}>
            <div className="form-group">
                <label className="form-label">Title</label>
                <input type="text"
                    className="form-control"
                    placeholder="Enter title"
                    value={title}
                    onChange={inputValue("title")}
                />
            </div>

            <div className="form-group mt-3">
                <label className="form-label">Content</label>
                <ReactQuill
                    value={content}
                    onChange={submitContent}
                    theme="snow"
                    className="mb-3"
                    placeholder="Write your content here..."
                />
            </div>

            <div className="form-group mt-3">
                <label>Author</label>
                <input type="text" className="form-control" value={author} onChange={inputValue("author")} />
            </div>
            <br />
            <input type="submit" value="Update" className="btn btn-primary" />
        </form>
    );

    // กำหนดค่าให้กับ state เมื่อมีการเปลี่ยนแปลงใน input
    const inputValue = name => event => {
        setState({
            ...state,
            [name]: event.target.value // อัพเดตค่าใน state ตามชื่อของ input
        });
    }

    // ฟังก์ชันสำหรับจัดการการส่งฟอร์ม
    const submitForm = (e) => {
        e.preventDefault(); // ป้องกันการรีเฟรชหน้าเว็บ        
        console.log("API URL = ", process.env.REACT_APP_API);
        axios
            .put(`${process.env.REACT_APP_API}/blog/${slug}`, {
                title,
                content,
                author
            },
            {
                headers: {
                    Authorization: `Bearer ${getToken()}` // ส่ง token สำหรับการยืนยันตัวตน
                }
            })
            .then(reponse => {
                Swal.fire({
                    title: "Alert",
                    text: "Topic update successfully!",
                    icon: "success"
                });

                const { title, content, author, slug } = reponse.data;
                setState({ title, author, slug }); // Update state with new values
                setContent(content); // Update content for ReactQuill
            })
            .catch(err => {
                // alert(err.reponse.data.error);
                Swal.fire({
                    title: "Alert",
                    text: err.response?.data?.error || "An error occurred",
                    icon: "error"
                });
            });
    }

    return (
        <div className="container p-5">
            <NavbarComponent />
            <h1>Update Topic</h1>
            {showUpdateForm()}

        </div>
    );
};

export default EditComponent;