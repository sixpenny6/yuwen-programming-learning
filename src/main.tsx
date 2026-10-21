import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './original/App';
import {CodeProvider} from './original/components/CodeContext';
import './styles.css';
import {languageName} from './original/language';
document.title='像学语文一样学 '+languageName;
createRoot(document.getElementById('root')!).render(<React.StrictMode><CodeProvider><App/></CodeProvider></React.StrictMode>);
