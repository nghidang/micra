import { useEffect, useState } from 'react';
import { IonButton, IonSpinner, IonText, IonToast } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { useUsersDataStore } from '../../application/stores/data/users.store';
import { useUsersUiStore } from '../../application/stores/ui/users-ui.store';
import { AppError } from '../../domain/errors/app-error';
import { UsersTemplate } from '../templates/UsersTemplate';
import { UserListOrganism } from '../organisms/UserListOrganism';
import { UserFormOrganism } from '../organisms/UserFormOrganism';

export function UsersPage() {
  const { t, i18n } = useTranslation('users');
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
      setMsg(t('added'));
    } catch (e) {
      notify(e instanceof AppError ? e.code : 'UNKNOWN'); // ErrorCode → UI Store
    }
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
