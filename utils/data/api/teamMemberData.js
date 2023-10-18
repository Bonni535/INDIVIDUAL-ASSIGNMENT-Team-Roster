import { clientCredentials } from '../../client';

const endpoint = clientCredentials.databaseURL;

const getTeamMembers = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teamMembers.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteTeamMember = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teamMembers/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getSingleTeamMember = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teamMembers/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createTeamMember = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teamMembers.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateTeamMember = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teamMembers/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getTeamMembers,
  createTeamMember,
  deleteTeamMember,
  getSingleTeamMember,
  updateTeamMember,
};
