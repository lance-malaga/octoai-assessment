/**
 * Instructions:
 * Your task is to create a React component that displays a sorted list of users.
 * This component fetches user data from the API and displays the result.
 * The API endpoint is provided as `API_ENDPOINT` and returns an array of 5 users. 
 * The User type describes the shape of a single user.
 *
 * Acceptance Criteria:
 * - users are sorted by their `createdAt` property in descending order
 * - show each user's name, creation date and avatar image
 *
 * Notes:
 * Don't worry about styling or complicated layouts. Any clear and readable presentation is acceptable.
 * This is a Typescript project but feel free to use vanilla JavaScript.
 * Include any added dependencies in `package.json` file.
 * The estimated time to complete this challenge is 30 minutes.
 *
 */

import { useEffect, useState } from "react";

const API_ENDPOINT = "https://66f44b0177b5e88970990f5f.mockapi.io/users";

type User = {
  id: string;
  createdAt: string; // This is an ISO string eg. "2023-01-01T00:00:00.000Z"
  name: string;
  avatar: string; // This is a URL to an image
};

export default function Users () {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect (() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        const data: User[] = await response.json();
        
        // Sort users by using the "createdAt" in descending order
        const sortedUsers = data.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setUsers(sortedUsers);
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [])

  return (
    <div>
      <h2>User List</h2>
      {loading && <p>Loading...</p>}
      {!loading && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <div>
                <img src={user.avatar} alt={`${user.name}'s avatar image`} width={50} height={50} />
                <div>
                  <strong>{user.name}</strong>
                  <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}