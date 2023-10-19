import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getTeamMembers } from '../utils/data/api/teamMemberData';
import { useAuth } from '../utils/context/authContext';
import TeamMemberCard from '../components/cards/teamMemberCard';

function Home() {
  const [teamMembers, setTeamMembers] = useState([]);

  const { user } = useAuth();

  const getAllTheTeamMembers = () => {
    getTeamMembers(user.uid).then(setTeamMembers);
  };

  useEffect(() => {
    getAllTheTeamMembers();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/teamMember/new" passHref>
        <Button>Add A New Team Member</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over books here using BookCard component */}
        {teamMembers.map((teamMember) => (
          <TeamMemberCard key={teamMember.firebaseKey} teamMemberObj={teamMember} onUpdate={getAllTheTeamMembers} />
        ))}
      </div>
    </div>
  );
}

export default Home;
