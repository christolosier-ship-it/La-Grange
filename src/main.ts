import { startApplication } from './app/bootstrap';
import {
  initializeAdminSession,
  mountAdminSessionControls,
} from './core/customization/admin-session';
import { installReleaseBadges } from './core/github/release-badges';
import './styles/index.css';
import './styles/project-card.css';
import './styles/catalogue.css';
import './styles/project-detail.css';
import './styles/activity.css';
import './styles/settings.css';
import './styles/phase-6-shell.css';
import './styles/phase-6b-layout.css';
import './styles/customization.css';
import './styles/compact-views.css';

const root = document.querySelector<HTMLElement>('#app');
startApplication(root);
const shell = root?.querySelector<HTMLElement>('.app-shell');
if (shell) mountAdminSessionControls(shell);
installReleaseBadges(root ?? document);
void initializeAdminSession();
