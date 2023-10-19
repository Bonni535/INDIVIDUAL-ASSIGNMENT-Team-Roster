import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleTeamMember } from '../../../utils/data/api/teamMemberData';
import TeamMemberForm from '../../../components/forms/teamMemberForm';

export default function EditTeamMember() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeamMember(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return <TeamMemberForm obj={editItem} />;
}
