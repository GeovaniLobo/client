import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../api';

export default function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data);
    };
    fetchProfile();
  }, [id]);

  if (!profile) return <p>Carregando...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <div className="mb-4">
        <img src={profile.coverImage || 'https://via.placeholder.com/800x200'} alt="Capa" className="w-full h-48 object-cover rounded" />
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <img src={profile.profileImage || 'https://via.placeholder.com/100'} alt="Perfil" className="w-24 h-24 rounded-full border-4 border-white -mt-12" />
        <div>
          <h1 className="text-3xl font-bold">{profile.name}</h1>
          <p>{profile.city} - {profile.profession}</p>
          <p>Idade: {profile.age}</p>
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-xl mb-2">Bio</h2>
        <p>{profile.bio || 'Sem bio ainda.'}</p>
      </div>
    </div>
  );
}
