import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createTeamMember, updateTeamMember } from '../../utils/data/api/teamMemberData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  name: '',
  role: '',
  image: '',
};

function TeamMemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateTeamMember(formInput).then(() => router.push('/teamMembers'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createTeamMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateTeamMember(patchPayload).then(() => {
          router.push('/teamMembers');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Team Member</h2>

      {/* Name INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Team Member Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* Role INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Team Member Role" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a role"
          name="role"
          value={formInput.role}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="New Team Member Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Team Member</Button>
    </Form>
  );
}

TeamMemberForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    image: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

TeamMemberForm.defaultProps = {
  obj: initialState,
};

export default TeamMemberForm;
