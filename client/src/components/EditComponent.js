import { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom"; // Import useParams

const EditComponent = () => {
    // กำหนดค่าเริ่มต้นให้กับ state
    const [state, setState] = useState({
        title: "",
        content: "",
        author: "",
        slug: ""
    });
    const { title, content, author } = state;   
    const { slug } = useParams(); // Get slug param

    // ใช้ useEffect เพื่อดึงข้อมูลจาก API เมื่อคอมโพเนนต์ถูกเรนเดอร์
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/blog/${slug}`)
            .then((response) => {
                console.log(response.data);
                const { title, content, author, slug } = response.data;
                setState({
                    title,
                    content,
                    author,
                    slug
                });                
            })
            .catch((error) => alert('Error fetching blog data:', error));
    }, [slug]);

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
                    title: "Alert",
                    text: "Topic created successfully!",
                    icon: "success"
                });
                // รีเซ็ตค่าใน state หลังจากส่งข้อมูลสำเร็จ
                setState({
                    title: "",
                    content: "",
                    author: ""
                });
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

        </div>
    );
};

export default EditComponent;