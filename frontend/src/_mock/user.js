import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(10)].map((_, index) => ({
  id: 'C1V2GUJ',
  avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  name: 'Mohamed Abdirahman',
  company: faker.company.companyName(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
}));

export default users;
