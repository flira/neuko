import { render } from 'preact';
import { App } from './app';
import '../index.css';

const appDiv = document.getElementById('app');
if (appDiv) {
  render(<App />, document.getElementById('app') as HTMLDivElement);
}

