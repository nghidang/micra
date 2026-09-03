import type { i18n as I18nInstance } from 'i18next';

import en from './en.json';
import vi from './vi.json';

export const usersNs = 'users' as const;

export type UsersLocale = typeof en;

const usersLocale: Record<'en' | 'vi', UsersLocale> = { en, vi };

const registered = new WeakSet<I18nInstance>();

export function registerUsersLocale(i18n: I18nInstance): void {
  if (registered.has(i18n)) return;

  registered.add(i18n);

  for (const [lng, resources] of Object.entries(usersLocale)) {
    i18n.addResourceBundle(lng, usersNs, resources, true, false);
  }
}
