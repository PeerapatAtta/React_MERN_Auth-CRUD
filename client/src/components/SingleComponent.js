import { useParams } from "react-router-dom";

const SingleComponent = () => {
    const { slug } = useParams();

    return (
        <div className="single-component">
            <h1>Single Component</h1>
            <p>This is a placeholder for the single component view.</p>
            <p>Component Slug: {slug}</p>
        </div>
    );
}

export default SingleComponent;