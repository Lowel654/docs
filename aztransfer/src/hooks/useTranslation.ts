'use client';

import { useParams } from 'next/navigation';
import { useCallback } from 'react';
import { t } from '@/i18n/translations';
import { Locale } from '@/types';
import { defaultLocale } from '@/i18n/locales';

export function useTranslation() {
  const params = useParams();
  const locale = (params?.locale as Locale) || defaultLocale;

  const translate = useCallback((key: string) => t(locale, key), [locale]);

  return {
    t: translate,
    locale,
  };
}
