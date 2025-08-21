import { useParams } from "react-router-dom";

function BlogPost() {
  const { id } = useParams(); // gets the dynamic :id from the URL

  return (
    <div className="card">
      <h2>Blog Post #{id}</h2>
      <p>This is the content for blog post with ID: {id}</p>
    </div>
  );
}

export default BlogPost;
