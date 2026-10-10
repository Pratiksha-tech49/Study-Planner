import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://study-planner-backend.onrender.com/api';

function App() {
  const [profile, setProfile] = useState({ name: '', usn: '', idCardNumber: '', dob: '', branch: 'Computer Science & Engineering' });
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({ title: '', type: 'Daily', category: 'DSA', targetDate: '' });

  useEffect(() => {
    fetchProfile();
    fetchGoals();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API_URL}/profile`);
      if (res.data.name) setProfile(res.data);
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const fetchGoals = async () => {
    try {
      const res = await axios.get(`${API_URL}/goals`);
      setGoals(res.data);
    } catch (err) {
      console.error('Error fetching goals:', err);
    }
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/profile`, profile);
      alert('Student Profile Saved Successfully!');
    } catch (err) {
      alert('Error saving profile');
    }
  };

  const addGoal = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/goals`, newGoal);
      setNewGoal({ title: '', type: 'Daily', category: 'DSA', targetDate: '' });
      fetchGoals();
    } catch (err) {
      alert('Error adding goal');
    }
  };

  const toggleGoal = async (id, currentStatus) => {
    try {
      await axios.put(`${API_URL}/goals/${id}`, { completed: !currentStatus });
      fetchGoals();
    } catch (err) {
      console.error('Error updating goal:', err);
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '850px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>BMSIT Academic & Placement Goal Planner</h1>

      {/* Student Profile Section */}
      <section style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px', marginBottom: '25px', backgroundColor: '#f9f9f9' }}>
        <h2>Student Information</h2>
        <form onSubmit={saveProfile} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <input placeholder="Student Name" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} required style={{ padding: '8px' }} />
          <input placeholder="USN (e.g., 1BY23CS...)" value={profile.usn} onChange={e => setProfile({...profile, usn: e.target.value})} required style={{ padding: '8px' }} />
          <input placeholder="ID Card Number" value={profile.idCardNumber} onChange={e => setProfile({...profile, idCardNumber: e.target.value})} required style={{ padding: '8px' }} />
          <input type="date" value={profile.dob ? profile.dob.split('T')[0] : ''} onChange={e => setProfile({...profile, dob: e.target.value})} required style={{ padding: '8px' }} />
          <input placeholder="Branch" value={profile.branch} onChange={e => setProfile({...profile, branch: e.target.value})} style={{ gridColumn: 'span 2', padding: '8px' }} />
          <button type="submit" style={{ gridColumn: 'span 2', padding: '10px', backgroundColor: '#27ae60', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            Save Student Details
          </button>
        </form>
      </section>

      {/* Placement Goals Section */}
      <section style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px', backgroundColor: '#fff' }}>
        <h2>Placement Preparation & Goal Tracker</h2>
        <form onSubmit={addGoal} style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <input placeholder="Goal Title (e.g. Solve 2 LeetCode Medium Trees)" value={newGoal.title} onChange={e => setNewGoal({...newGoal, title: e.target.value})} required style={{ flex: '2', padding: '8px' }} />
          <select value={newGoal.type} onChange={e => setNewGoal({...newGoal, type: e.target.value})} style={{ padding: '8px' }}>
            <option value="Daily">Daily Goal</option>
            <option value="Weekly">Weekly Goal</option>
            <option value="Monthly">Monthly Target</option>
          </select>
          <select value={newGoal.category} onChange={e => setNewGoal({...newGoal, category: e.target.value})} style={{ padding: '8px' }}>
            <option value="DSA">DSA</option>
            <option value="DBMS">DBMS</option>
            <option value="Upskilling">Upskilling</option>
            <option value="Academic">Academic</option>
          </select>
          <input type="date" value={newGoal.targetDate} onChange={e => setNewGoal({...newGoal, targetDate: e.target.value})} required style={{ padding: '8px' }} />
          <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#2980b9', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            Add Goal
          </button>
        </form>

        <h3>Current Goals List</h3>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          {goals.map(goal => (
            <li key={goal._id} style={{ padding: '10px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ textDecoration: goal.completed ? 'line-through' : 'none', color: goal.completed ? '#7f8c8d' : '#2c3e50' }}>
                <strong>[{goal.type} - {goal.category}]</strong> {goal.title} — <em>Due: {new Date(goal.targetDate).toLocaleDateString()}</em>
              </span>
              <button onClick={() => toggleGoal(goal._id, goal.completed)} style={{ padding: '5px 10px', backgroundColor: goal.completed ? '#f39c12' : '#2ecc71', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                {goal.completed ? 'Mark Pending' : 'Mark Complete'}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;