import { useState } from "react";

const FormComponent = () => {
    const [state, setState] = useState({
        title: "",
        content: "",
        author: ""
    });
    const { title, content, author } = state;

    return (
        <div className="container p-5">
            <h1>New Topic</h1>
            {JSON.stringify(state)}
            <br />
            <form >
                <div className="form-group">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" placeholder="Enter title" value={title}/>
                </div>
                <div className="form-group mt-3">
                    <label className="form-label">Content</label>
                    <textarea className="form-control" value={content} placeholder="Enter content"></textarea>
                </div>
                <div className="form-group mt-3">
                    <label>Author</label>
                    <input type="text" className="form-control" value={author} />
                </div>
                <br />
                <input type="submit" value="Save" className="btn btn-primary" />
                <a href="/" className="btn btn-success ms-2">Home</a>
            </form>
        </div>
    );
};

export default FormComponent;