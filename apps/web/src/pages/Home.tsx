import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Home = () => (
  <IonPage>
    <IonHeader translucent>
      <IonToolbar>
        <IonTitle>Home</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen className="ion-padding">
      <p>
        <strong>MICRA — shell</strong>
      </p>
      <IonButton routerLink="/users" expand="block">
        Đi tới Users (MFE)
      </IonButton>
    </IonContent>
  </IonPage>
);

export default Home;
