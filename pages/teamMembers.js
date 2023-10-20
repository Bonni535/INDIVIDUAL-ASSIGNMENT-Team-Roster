/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getTeamMembers } from '../utils/data/api/teamMemberData';
import { useAuth } from '../utils/context/authContext';
import TeamMemberCard from '../components/cards/teamMemberCard';

function ShowTeamMembers() {
  // Set a state for teamMembers
  const [teamMembers, setTeamMembers] = useState([]);
  // Get the user UID using useAuth Hook
  const { user } = useAuth();
  // create a function that makes the API call to get all the books
  const getAllTheTeamMembers = (() => {
    getTeamMembers(user.uid).then(setTeamMembers);
  });
  // make the call to the API to get all the teamMembers on component render
  useEffect(() => {
    getAllTheTeamMembers();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/teamMember/new" passHref>
        <Button>Add A New Team Member</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over teamMembers here using TeamMemberCard component */}
        {teamMembers.map((teamMember) => (
          <TeamMemberCard key={teamMember.firebaseKey} teamMemberObj={teamMember} onUpdate={getAllTheTeamMembers} />
        ))}
      </div>
    </div>
  );
}

export default ShowTeamMembers;
