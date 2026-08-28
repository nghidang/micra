import { IonButton, IonInput, IonItem } from '@ionic/react';
import { useState } from 'react';

export function UserFormOrganism({
  onSubmit,
}: {
  onSubmit: (input: { name: string; email: string }) => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  return (
    <>
      <IonItem>
        <IonInput label="Name" value={name} onIonInput={(e) => setName(e.detail.value ?? '')} />
      </IonItem>
      <IonItem>
        <IonInput label="Email" value={email} onIonInput={(e) => setEmail(e.detail.value ?? '')} />
      </IonItem>
      <IonButton onClick={() => onSubmit({ name, email })}>Thêm user</IonButton>
    </>
  );
}
