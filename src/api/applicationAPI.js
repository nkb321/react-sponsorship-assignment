import axios from 'axios';
import { v4 as v4id } from 'uuid'

const URL = 'http://localhost:3005/applications';

const submitApplication = async (application) => {
  return await axios.post(URL, {
    ...application,
    id: v4id(),
    updated_at: new Date().toISOString(),
    created_at: new Date().toISOString()
  });
}

const fetchApplication = async (applicationId) => {
  return await axios.get(`${URL}/${applicationId}`);
};

export { submitApplication, fetchApplication };