import { useState } from 'react';
import Layout from './Layout';

export default function () {
  const [count, setCount] = useState(0);
  return (
    <Layout location={{"level 1": "home", "level 2": "home"}}>
      <h1>Hello, World</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/app.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and Preact logos to learn more
      </p>
    </Layout>
  )
}

