import { User } from '../models/user.model';

export const MOCK_USERS: User[] = [
  {
    username: 'admin',
    password: 'admin',
    displayName: 'Administrator',
    role: 'admin',
  },
  {
    username: 'player',
    password: 'game123',
    displayName: 'Player One',
    role: 'user',
  },
  {
    username: 'demo',
    password: 'demo',
    displayName: 'Demo User',
  },
];
