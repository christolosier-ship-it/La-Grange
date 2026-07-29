import { startApplication } from './app/bootstrap';
import './styles/index.css';
import './styles/project-card.css';
import './styles/catalogue.css';
import './styles/project-detail.css';

startApplication(document.querySelector<HTMLElement>('#app'));
