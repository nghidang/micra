import { useEffect, useState } from 'react';
import { IonButton, IonSpinner, IonText, IonToast } from '@ionic/react';
import { useUsersDataStore } from '../../application/stores/data/users.store';
import { useUsersUiStore } from '../../application/stores/ui/users-ui.store';
import { AppError } from '../../domain/errors/app-error';
import { errorMessages } from '../locales/error-messages';
import { UsersTemplate } from '../templates/UsersTemplate';
import { UserListOrganism } from '../organisms/UserListOrganism';
import { UserFormOrganism } from '../organisms/UserFormOrganism';

export function UsersPage() {
  const store = useUsersDataStore();
  const { items, loading, load, create } = store();
  const filterOpen = useUsersUiStore((s) => s.filterOpen);
  const toggleFilter = useUsersUiStore((s) => s.toggleFilter);
  const notification = useUsersUiStore((s) => s.notification);
  const notify = useUsersUiStore((s) => s.notify);
  const clearNotification = useUsersUiStore((s) => s.clearNotification);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => { void load(); }, [load]);

  const handleSubmit = async (input: { name: string; email: string }) => {
    try {
      await create(input);
      setMsg('✅ Đã thêm user');
    } catch (e) {
      notify(e instanceof AppError ? e.code : 'UNKNOWN'); // → Notification State (UI Store)
    }
  };

  return (
    <UsersTemplate title="Users">
      <IonButton onClick={toggleFilter}>{filterOpen ? 'Ẩn' : 'Hiện'} filter</IonButton>
      {filterOpen && <p>Filter panel (UI state — Luồng 3)</p>}
      <UserFormOrganism onSubmit={handleSubmit} />
      {msg && <IonText><p>{msg}</p></IonText>}
      {loading ? <IonSpinner /> : <UserListOrganism items={items} />}
      <IonToast
        isOpen={!!notification}
        message={notification ? errorMessages[notification.code] : ''}
        duration={2500}
        color="danger"
        onDidDismiss={clearNotification}
      />
    </UsersTemplate>
  );
}
