/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Form } from 'react-bootstrap';
import { getTeamMembers } from '../utils/data/api/teamMemberData';
import { useAuth } from '../utils/context/authContext';
import TeamMemberCard from '../components/cards/teamMemberCard';

function Home() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [showingTeamMembers, setShowingTeamMembers] = useState([]);

  const { user } = useAuth();

  const getAllTheTeamMembers = () => {
    getTeamMembers(user.uid).then(setTeamMembers);
  };

  const handleSearch = (e) => {
    const searchResults = teamMembers.filter((member) => member.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setShowingTeamMembers(searchResults);
  };

  useEffect(() => {
    getAllTheTeamMembers();
  }, []);

  useEffect(() => {
    setShowingTeamMembers(teamMembers);
  }, [teamMembers]);

  return (
    <div className="text-center my-4">
      <Link href="/teamMember/new" passHref>
        <Button>Add A New Team Member</Button>
      </Link>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Search</Form.Label>
        <Form.Control as="textarea" rows={1} onChange={handleSearch} />
      </Form.Group>
      <div className="d-flex flex-wrap">
        {/* TODO: map over teammembers here using teamMemberCard component */}
        {showingTeamMembers.map((teamMember) => (
          <TeamMemberCard key={teamMember.firebaseKey} teamMemberObj={teamMember} onUpdate={getAllTheTeamMembers} />
        ))}
      </div>
    </div>
  );
}

export default Home;
