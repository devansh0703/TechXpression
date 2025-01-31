import React, { useState } from 'react';

const BlogList = ({ blogs, onVote, onComment }) => {
  const [commentInputs, setCommentInputs] = useState({});

  const handleCommentSubmit = (blogId) => {
    if (commentInputs[blogId]?.trim()) {
      onComment(blogId, commentInputs[blogId]);
      setCommentInputs({ ...commentInputs, [blogId]: '' });
    }
  };

  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <div key={blog.id} className="blog-card">
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
          <div className="blog-meta">
            <div className="votes">
              <button onClick={() => onVote(blog.id, 'up')}>👍</button>
              <span>{blog.votes}</span>
              <button onClick={() => onVote(blog.id, 'down')}>👎</button>
            </div>
            <div className="category-tag">{blog.category}</div>
          </div>
          <div className="comments-section">
            <h3>Comments</h3>
            {blog.comments.map((comment) => (
              <div key={comment.id} className="comment">
                {comment.text}
              </div>
            ))}
            <div className="add-comment">
              <input
                type="text"
                value={commentInputs[blog.id] || ''}
                onChange={(e) =>
                  setCommentInputs({
                    ...commentInputs,
                    [blog.id]: e.target.value,
                  })
                }
                placeholder="Add a comment..."
              />
              <button onClick={() => handleCommentSubmit(blog.id)}>
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