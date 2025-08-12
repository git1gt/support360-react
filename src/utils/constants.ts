/**
 * Константы приложения
 * Централизованное хранение всех констант для легкого управления
 */

// Контактная информация
export const CONTACT_INFO = {
  company: 'ООО "ИТ Лаборатория"',
  email: 'info@support360.ru',
  phone: '+7 (383) 383-82-86',
  address: '630007, г. Новосибирск, ул. Большевистская, д.97',
  telegramBot: 'https://t.me/dev_support360_bot',
  website: 'https://support360.ru'
} as const;

// Цены и тарифы
export const PRICING = {
  basePrice: 1990,
  additionalOperator: 490,
  currency: '₽',
  period: 'мес'
} as const;

// Статистика
export const STATISTICS = {
  processingSpeedImprovement: 75,
  customerSatisfaction: 90,
  routineReduction: 60,
  setupTime: '15 мин'
} as const;

// Время анимации
export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
  counter: 2000
} as const;

// Breakpoints для адаптивности
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280
} as const;