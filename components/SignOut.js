import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function SignOut() {
  return (
    <Button className="sign-out" onClick={signOut}>Sign Out</Button>
  );
}
