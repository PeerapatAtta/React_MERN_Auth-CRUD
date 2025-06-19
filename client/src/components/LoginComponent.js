import NavbarComponent from "./NavbarComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { authenticate } from "../services/authorize"; // นำเข้า authenticate 
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/authorize";

const LoginComponent = () => {
    // กำหนดค่าเริ่มต้นให้กับ state
    const [state, setState] = useState({
        username: "",
        password: ""
    });
    const { username, password } = state;
    const navigate = useNavigate(); // ใช้ useNavigate แทน withRouter

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
        console.table({ username, password }); // แสดงค่าใน console
        console.log("API URL = ", process.env.REACT_APP_API); // แสดง URL ของ API ที่ใช้
        // ส่งข้อมูลไปยัง API ด้วย axios
        axios
            .post(`${process.env.REACT_APP_API}/login`, { username, password })
            .then(response => {
                // console.log(response); // แสดงข้อมูลที่ได้รับจาก API
                // ใช้ฟังก์ชัน authenticate เพื่อเก็บ token และ username ใน sessionStorage
                authenticate(response, () => navigate("/")); // เปลี่ยนเส้นทางไปยังหน้าแรกหลังจากล็อกอินสำเร็จ
            })
            .catch(err => {
                console.log(err.response); // แสดงข้อผิดพลาดใน console
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.response.data.error || 'Something went wrong!'
                });
            });
    }

    // ตรวจสอบว่าผู้ใช้ล็อกอินอยู่แล้วหรือไม่
    useEffect(() => {
        if (getUser()) {
            navigate("/"); // ถ้าผู้ใช้ล็อกอินอยู่แล้ว ให้เปลี่ยนเส้นทางไปยังหน้าแรก
        }
    }, [navigate]);

    // แสดงผล UI ของคอมโพเนนต์
    // ใช้ JSX เพื่อสร้างฟอร์มสำหรับการล็อกอิน
    return (
        <div className="container p-5">
            <NavbarComponent />
            <h1>Login</h1>
            <form onSubmit={submitForm}>

                <div className="form-group">
                    <label className="form-label">Username</label>
                    <input type="text"
                        className="form-control"
                        placeholder="Enter username"
                        value={username}
                        onChange={inputValue("username")}
                    />
                </div>

                <div className="form-group mt-3">
                    <label className="form-label">Password</label>
                    <input type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={inputValue("password")}
                    />
                </div>
                <br />
                <input type="submit" value="Login" className="btn btn-primary" />
            </form>
        </div>
    );
}

export default LoginComponent;