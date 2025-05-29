import { useState } from "react";
import NavbarComponent from "./NavbarComponent";

const FormComponent = () => {
    const [state, setState] = useState({
        title: "",
        content: "",
        author: ""
    });
    const { title, content, author } = state;
    // กำหนดค่าให้กับ state เมื่อมีการเปลี่ยนแปลงใน input
    const inputValue = name => event => {
        console.log(name, "=", event.target.value);
        // ใช้ setState เพื่ออัพเดตค่าใน state
        setState({
            ...state,
            [name]: event.target.value
        });
    }

    return (
        <div className="container p-5">
            <NavbarComponent />
            <h1>New Topic</h1>
            {JSON.stringify(state)}
            <br />
            <form >
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