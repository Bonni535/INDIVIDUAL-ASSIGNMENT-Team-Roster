import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteTeamMember } from '../../utils/data/api/teamMemberData';

function TeamMemberCard({ teamMemberObj, onUpdate }) {
  const deleteThisTeamMember = () => {
    if (window.confirm(`Delete ${teamMemberObj.name}?`)) {
      deleteTeamMember(teamMemberObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={teamMemberObj.image} alt={teamMemberObj.name} style={{ height: '200px' }} />
      <Card.Body>
        <Card.Title>{teamMemberObj.name}</Card.Title>
        <Card.Text>{teamMemberObj.role}</Card.Text>
        {/* DYNAMIC LINK TO VIEW THE TEAM MEMBER DETAILS  */}
        <Link href={`/teamMember/${teamMemberObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE TEAM MEMBER DETAILS  */}
        <Link href={`/teamMember/edit/${teamMemberObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisTeamMember} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

TeamMemberCard.propTypes = {
  teamMemberObj: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    image: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TeamMemberCard;
