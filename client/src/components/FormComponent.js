import { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { getUser, getToken } from "../services/authorize"; // นำเข้า getUser เพื่อตรวจสอบสถานะการล็อกอินของผู้ใช้

const FormComponent = () => {
    // กำหนดค่าเริ่มต้นให้กับ state
    const [state, setState] = useState({
        title: "",
        author: getUser()
    });
    const { title, author } = state;

    const [content, setContent] = useState(""); // แยก state สำหรับ content เนื่องจากใช้ ReactQuill

    // กำหนดค่าให้กับ state เมื่อมีการเปลี่ยนแปลงใน input
    const inputValue = name => event => {
        setState({
            ...state,
            [name]: event.target.value // อัพเดตค่าใน state ตามชื่อของ input
        });
    }

    // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงใน ReactQuill
    const submitContent = (event) => {
        setContent(event); // อัพเดตค่า content ใน state
    }

    // ฟังก์ชันสำหรับจัดการการส่งฟอร์ม
    const submitForm = (e) => {
        e.preventDefault(); // ป้องกันการรีเฟรชหน้าเว็บ
        // console.table({ title, content, author }); // แสดงค่าใน console
        console.log("API URL = ", process.env.REACT_APP_API);
        axios
            .post(`${process.env.REACT_APP_API}/create`,
                { title, content, author }, // ส่งข้อมูล title, content และ author ไปยัง API
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}` // ส่ง token สำหรับการยืนยันตัวตน
                    }
                })
            .then(reponse => {
                // alert("Topic created successfully!");
                Swal.fire({
                    title: "Alert",
                    text: "Topic created successfully!",
                    icon: "success"
                });
                // รีเซ็ตค่าใน state หลังจากส่งข้อมูลสำเร็จ
                setState({
                    title: "",
                    author: ""
                });
                setContent(""); // รีเซ็ต content
                // ล้างค่าใน input ของ ReactQuill
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
            <h1>New Topic</h1>
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
                <input type="submit" value="Save" className="btn btn-primary" />
            </form>
        </div>
    );
};

export default FormComponent;