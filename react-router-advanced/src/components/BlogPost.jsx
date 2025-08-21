// src/pages/BlogPost.jsx
import { useParams } from "react-router-dom";

function BlogPost() {
  const { postId } = useParams();

  return (
    <div className="card">
      <h2>Blog Post #{postId}</h2>
      <p>
        This is where the content for blog post <strong>{postId}</strong> would go.
      </p>
    </div>
  );
}

export default BlogPost;
