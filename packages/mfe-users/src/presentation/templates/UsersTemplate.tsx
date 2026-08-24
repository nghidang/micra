import type { ReactNode } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

export function UsersTemplate({ title, children }: { title: string; children: ReactNode }) {
  return (
    <IonPage>
      <IonHeader><IonToolbar><IonTitle>{title}</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">{children}</IonContent>
    </IonPage>
  );
}
