import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/api/posts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Feed</h1>
      {posts.length === 0 && <p>Nenhum post ainda.</p>}
      <div className="space-y-6">
        {posts.map(post => (
          <div key={post._id} className="border p-4 rounded shadow-sm bg-white">
            <h2 className="font-semibold mb-2">{post.author.name}</h2>
            <p className="mb-2">{post.text}</p>
            {post.image && <img src={post.image} alt="post" className="max-h-64 rounded mb-2" />}
            <p className="text-sm text-gray-600">Curtidas: {post.likes.length}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
