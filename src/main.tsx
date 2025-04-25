
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// Make sure we have a valid root element
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error("Root element not found");
}
