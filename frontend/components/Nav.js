import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from './User';

const Nav = () => (
  <NavStyles>
    <User>
      {({ data: { me } }) => {
        console.log(me);
        if (me) return <p>{me.name}</p>;
        return null;
      }
      }
    </User>
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/signup">
      <a>Signup</a>
    </Link>
  </NavStyles>
);

export default Nav;
