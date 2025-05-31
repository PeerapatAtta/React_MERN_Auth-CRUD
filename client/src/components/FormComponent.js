import { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";

const FormComponent = () => {
    // กำหนดค่าเริ่มต้นให้กับ state
    const [state, setState] = useState({
        title: "",
        content: "",
        author: ""
    });
    const { title, content, author } = state;

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
        // console.table({ title, content, author }); // แสดงค่าใน console
        console.log("API URL = ", process.env.REACT_APP_API);
        axios.post(`${process.env.REACT_APP_API}/create`, {
            title,
            content,
            author
        })
            .then(reponse => {
                // alert("Topic created successfully!");
                Swal.fire({
                    title: "Good job!",
                    text: "You clicked the button!",
                    icon: "success"
                });
            })
            .catch(error => {
                console.error("There was an error creating the topic!", error);
                alert(error.reponse.data.error);
            });
    }

    return (
        <div className="container p-5">
            <NavbarComponent />
            <h1>New Topic</h1>
            {/* {JSON.stringify(state)} */}
            <br />
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
                    <textarea className="form-control" value={content} placeholder="Enter content" onChange={inputValue("content")}></textarea>
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