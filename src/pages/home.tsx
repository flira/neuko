import { useState } from 'react';
import { Layout } from './layout';

export function Home() {
  const [count, setCount] = useState(0);
  return (
    <Layout>
      <h1>Vite + Preact</h1>
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
