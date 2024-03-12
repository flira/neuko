import { Link } from 'react-router-dom';

export default function ({ children }: React.HTMLProps<HTMLElement>) {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to={'/'}>Home</Link>
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