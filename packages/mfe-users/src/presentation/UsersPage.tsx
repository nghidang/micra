import { IonContent, IonHeader, IonList, IonItem, IonLabel, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import { useUsers } from '../application/users.context';

export function UsersPage() {
  const { items, loading } = useUsers();
  return (
    <IonPage>
      <IonHeader><IonToolbar><IonTitle>Users</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        {loading ? <IonSpinner /> : (
          <IonList>
            {items.map((u) => (
              <IonItem key={u.id}>
                <IonLabel><h2>{u.label}</h2><p>{u.sub}</p></IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
}
