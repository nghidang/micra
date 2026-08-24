import { IonList, IonItem, IonLabel } from '@ionic/react';
import type { UserListItem } from '../../application/usecases/get-users.usecase';

export function UserListOrganism({ items }: { items: UserListItem[] }) {
  return (
    <IonList>
      {items.map((u) => (
        <IonItem key={u.id}>
          <IonLabel><h2>{u.label}</h2><p>{u.sub}</p></IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}
