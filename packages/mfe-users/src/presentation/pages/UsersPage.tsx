import { useState } from 'react';
import { IonButton, IonSpinner, IonText, IonToast } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { useUsersQuery, useCreateUser } from '../hooks/use-users';
import { useUsersUiStore } from '../../application/stores/ui/users-ui.store';
import { UsersTemplate } from '../templates/UsersTemplate';
import { UserListOrganism } from '../organisms/UserListOrganism';
import { UserFormOrganism } from '../organisms/UserFormOrganism';

export function UsersPage() {
  const { t, i18n } = useTranslation('users');

  // server-state → React Query (tự fetch khi mount, không cần useEffect)
  const { data: items = [], isLoading: loading } = useUsersQuery();
  const createUser = useCreateUser();

  // UI-state → Zustand
  const filterOpen = useUsersUiStore((s) => s.filterOpen);
  const toggleFilter = useUsersUiStore((s) => s.toggleFilter);
  const notification = useUsersUiStore((s) => s.notification);
  const clearNotification = useUsersUiStore((s) => s.clearNotification);
  const [msg, setMsg] = useState<string | null>(null);

  const handleSubmit = (input: { name: string; email: string }) => {
    createUser.mutate(input, { onSuccess: () => setMsg(t('added')) });
    // lỗi → hook useCreateUser tự notify (UI Store) → toast hiện
  };

  const toggleLang = () => i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi');

  return (
    <UsersTemplate title={t('title')}>
      <IonButton onClick={toggleLang}>{i18n.language.toUpperCase()}</IonButton>
      <IonButton onClick={toggleFilter}>{filterOpen ? t('filterHide') : t('filterShow')}</IonButton>
      {filterOpen && <p>Filter panel (UI state — Luồng 3)</p>}
      <UserFormOrganism onSubmit={handleSubmit} />
      {msg && <IonText><p>{msg}</p></IonText>}
      {loading ? <IonSpinner /> : <UserListOrganism items={items} />}
      <IonToast
        isOpen={!!notification}
        message={notification ? t(`errors.${notification.code}`) : ''}
        duration={2500}
        color="danger"
        onDidDismiss={clearNotification}
      />
    </UsersTemplate>
  );
}
