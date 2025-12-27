import React, { useState, useEffect } from 'react';
import { Team } from '../types';
import TeamModal from '../components/teams/TeamModal';
import { teamService } from '../services/teamService';

const TeamsPage = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  // Load Data
  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    const data = await teamService.getAll();
    setTeams(data);
    setLoading(false);
  };

  const handleSaveTeam = async (data: Team) => {
    if (selectedTeam) {
      await teamService.update(data);
      setTeams(prev => prev.map(t => t.id === data.id ? data : t));
    } else {
      const { id, ...newTeam } = data;
      const created = await teamService.create(newTeam);
      setTeams(prev => [...prev, created as Team]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
      if (window.confirm("Are you sure you want to delete this team?")) {
          await teamService.delete(id);
          setTeams(prev => prev.filter(t => t.id !== id));
      }
  };

  // Filter
  const filteredTeams = teams.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) return <div style={{ padding: '24px' }}>Loading Teams...</div>;

  return (
    <div style={{ padding: '24px', backgroundColor: '#fff', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', margin: 0 }}>Teams</h1>
        <button onClick={() => { setSelectedTeam(null); setIsModalOpen(true); }} style={{ background: '#2563eb', color: 'white', padding: '8px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>+ New</button>
      </div>

      <div style={{ marginBottom: '20px' }}>
          <input type="text" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ padding: '10px', width: '300px', borderRadius: '6px', border: '1px solid #ddd' }} />
      </div>

      <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f9fafb' }}>
                <tr>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Members</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Company</th>
                    <th style={{ padding: '12px' }}></th>
                </tr>
            </thead>
            <tbody>
                {filteredTeams.map(team => (
                    <tr key={team.id} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px', cursor: 'pointer' }} onClick={() => { setSelectedTeam(team); setIsModalOpen(true); }}>{team.name}</td>
                        <td style={{ padding: '12px' }}>{team.members.join(', ')}</td>
                        <td style={{ padding: '12px' }}>{team.company}</td>
                        <td style={{ padding: '12px', textAlign: 'right' }}>
                            <button onClick={() => handleDelete(team.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>✕</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
      <TeamModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialData={selectedTeam} onSave={handleSaveTeam} />
    </div>
  );
};
export default TeamsPage;