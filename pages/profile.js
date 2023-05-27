import Image from 'next/image';
import { useAuth } from '../utils/context/authContext';
import SignOut from '../components/SignOut';

export default function User() {
  const { user } = useAuth();
  return (
    <div className="text-light text-center">
      <Image
        src={user.photoURL}
        className="rounded-circle"
        width="100px"
        height="100px"
      />
      <h2>{user.displayName}</h2>
      <h3>{user.email}</h3>
      <h3>{user.metadata.lastSignInTime}</h3>
      <SignOut />
    </div>
  );
}
