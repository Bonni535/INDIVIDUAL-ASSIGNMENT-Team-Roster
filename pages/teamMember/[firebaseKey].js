import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getSingleTeamMember } from '../../utils/data/api/teamMemberData';

export default function ViewTeamMember() {
  const [teamMemberDetails, setTeamMemberDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeamMember(firebaseKey).then(setTeamMemberDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <Image src={teamMemberDetails.image} alt={teamMemberDetails.name} style={{ width: '300px' }} />
      </div>
      role:
      <p>{teamMemberDetails.role || ''}</p>
      <hr />
    </div>
  );
}
