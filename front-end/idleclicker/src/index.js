import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./telas/app";

const root = createRoot(document.getElementById('root'));

root.render(<App></App>);