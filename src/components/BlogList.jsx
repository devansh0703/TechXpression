import React, { useState } from "react";

const BlogList = ({ blogs, onVote, onComment }) => {
  const [commentInputs, setCommentInputs] = useState({});

  const handleCommentSubmit = (blogId) => {
    if (commentInputs[blogId]?.trim()) {
      onComment(blogId, commentInputs[blogId]);
      setCommentInputs({ ...commentInputs, [blogId]: "" });
    }
  };

  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="blog-card bg-black text-white p-6 rounded-lg shadow-lg border-4 border-transparent hover:border-green-500 transition-all duration-300"
        >
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
            {blog.title}
          </h2>
          <p>{blog.content}</p>
          <div className="blog-meta flex justify-between items-center mt-4">
            <div className="votes flex items-center space-x-2">
              <button
                onClick={() => onVote(blog.id, "up")}
                className="text-green-500 hover:text-green-700"
              >
                👍
              </button>
              <span>{blog.votes}</span>
              <button
                onClick={() => onVote(blog.id, "down")}
                className="text-green-500 hover:text-green-700"
              >
                👎
              </button>
            </div>
            <div className="category-tag text-gray-400">{blog.category}</div>
          </div>
          <div className="comments-section mt-6">
            <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
              Comments
            </h3>
            {blog.comments.map((comment) => (
              <div
                key={comment.id}
                className="comment py-2 px-4 bg-gray-800 rounded-lg mt-2"
              >
                {comment.text}
              </div>
            ))}
            <div className="add-comment mt-4 flex items-center space-x-2">
              <input
                type="text"
                value={commentInputs[blog.id] || ""}
                onChange={(e) =>
                  setCommentInputs({
                    ...commentInputs,
                    [blog.id]: e.target.value,
                  })
                }
                placeholder="Add a comment..."
                className="p-2 w-full rounded-lg bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={() => handleCommentSubmit(blog.id)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
