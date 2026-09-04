import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { UsersPage, UsersProvider } from '@repo/mfe-users';
import { Navigate, Route } from 'react-router-dom';

import i18n from './i18n';
import Home from './pages/Home';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

setupIonicReact();

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/home" element={<Home />} />
        <Route
          path="/users"
          element={
            <UsersProvider i18n={i18n}>
              <UsersPage />
            </UsersProvider>
          }
        />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
