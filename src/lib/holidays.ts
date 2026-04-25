// Türkiye Resmi Tatil Günleri ve İş Mantığı

export interface PublicHoliday {
  date: string; // YYYY-MM-DD
  name: string;
  isHalfDay?: boolean;
}

// 2026 Yılı Resmi Tatilleri (Sabit ve Dini)
export const HOLIDAYS_2026: PublicHoliday[] = [
  { date: '2026-01-01', name: 'Yılbaşı' },
  { date: '2026-03-19', name: 'Ramazan Bayramı Arifesi', isHalfDay: true },
  { date: '2026-03-20', name: 'Ramazan Bayramı (1. Gün)' },
  { date: '2026-03-21', name: 'Ramazan Bayramı (2. Gün)' },
  { date: '2026-03-22', name: 'Ramazan Bayramı (3. Gün)' },
  { date: '2026-04-23', name: 'Ulusal Egemenlik ve Çocuk Bayramı' },
  { date: '2026-05-01', name: 'Emek ve Dayanışma Günü' },
  { date: '2026-05-19', name: 'Atatürk\'ü Anma, Gençlik ve Spor Bayramı' },
  { date: '2026-05-26', name: 'Kurban Bayramı Arifesi', isHalfDay: true },
  { date: '2026-05-27', name: 'Kurban Bayramı (1. Gün)' },
  { date: '2026-05-28', name: 'Kurban Bayramı (2. Gün)' },
  { date: '2026-05-29', name: 'Kurban Bayramı (3. Gün)' },
  { date: '2026-05-30', name: 'Kurban Bayramı (4. Gün)' },
  { date: '2026-07-15', name: 'Demokrasi ve Milli Birlik Günü' },
  { date: '2026-08-30', name: 'Zafer Bayramı' },
  { date: '2026-10-28', name: 'Cumhuriyet Bayramı Arifesi', isHalfDay: true },
  { date: '2026-10-29', name: 'Cumhuriyet Bayramı' },
];

export function getHoliday(dateStr: string): PublicHoliday | undefined {
  return HOLIDAYS_2026.find(h => h.date === dateStr);
}

export function isHoliday(dateStr: string): boolean {
  return !!getHoliday(dateStr);
}
