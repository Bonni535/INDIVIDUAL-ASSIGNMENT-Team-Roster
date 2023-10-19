import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleTeamMember } from '../../utils/data/api/teamMemberData';

export default function ViewTeamMember() {
  const [teamMemberDetails, setTeamMemberDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeamMember(firebaseKey).then(setTeamMemberDetails);
  });

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={teamMemberDetails.image} alt={teamMemberDetails.title} style={{ width: '300px' }} />
      </div>
      role:
      <p>{teamMemberDetails.role || ''}</p>
      <hr />
    </div>
  );
}
