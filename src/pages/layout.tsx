import {Link} from 'react-router-dom';

export function Layout({children}: React.HTMLProps<HTMLElement>) {
  return (
    <>
      <header>
      <nav>
        <ul>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'/test'}>Test</Link>
          </li>
        </ul>
      </nav>
      </header>
      <main>
        {children}
      </main>
    </>
  )
}
