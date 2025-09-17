export interface ArabicText {
  en: string;
  ar: string;
}

export interface ArabicLabels {
  [key: string]: ArabicText;
}

// Common Arabic labels used across components
export const commonLabels: ArabicLabels = {
  // Actions
  submit: { en: 'Submit', ar: 'إرسال' },
  cancel: { en: 'Cancel', ar: 'إلغاء' },
  save: { en: 'Save', ar: 'حفظ' },
  delete: { en: 'Delete', ar: 'حذف' },
  edit: { en: 'Edit', ar: 'تعديل' },
  add: { en: 'Add', ar: 'إضافة' },
  remove: { en: 'Remove', ar: 'إزالة' },
  close: { en: 'Close', ar: 'إغلاق' },
  open: { en: 'Open', ar: 'فتح' },
  search: { en: 'Search', ar: 'بحث' },
  filter: { en: 'Filter', ar: 'تصفية' },
  sort: { en: 'Sort', ar: 'ترتيب' },
  next: { en: 'Next', ar: 'التالي' },
  previous: { en: 'Previous', ar: 'السابق' },
  back: { en: 'Back', ar: 'رجوع' },
  continue: { en: 'Continue', ar: 'متابعة' },
  finish: { en: 'Finish', ar: 'إنهاء' },
  loading: { en: 'Loading...', ar: 'جاري التحميل...' },
  error: { en: 'Error', ar: 'خطأ' },
  success: { en: 'Success', ar: 'نجح' },
  warning: { en: 'Warning', ar: 'تحذير' },
  info: { en: 'Information', ar: 'معلومات' },
  
  // Form elements
  required: { en: 'Required', ar: 'مطلوب' },
  optional: { en: 'Optional', ar: 'اختياري' },
  invalid: { en: 'Invalid', ar: 'غير صحيح' },
  valid: { en: 'Valid', ar: 'صحيح' },
  placeholder: { en: 'Enter text...', ar: 'أدخل النص...' },
  
  // Navigation
  home: { en: 'Home', ar: 'الرئيسية' },
  menu: { en: 'Menu', ar: 'القائمة' },
  settings: { en: 'Settings', ar: 'الإعدادات' },
  profile: { en: 'Profile', ar: 'الملف الشخصي' },
  logout: { en: 'Logout', ar: 'تسجيل الخروج' },
  
  // Status
  online: { en: 'Online', ar: 'متصل' },
  offline: { en: 'Offline', ar: 'غير متصل' },
  active: { en: 'Active', ar: 'نشط' },
  inactive: { en: 'Inactive', ar: 'غير نشط' },
  pending: { en: 'Pending', ar: 'في الانتظار' },
  completed: { en: 'Completed', ar: 'مكتمل' },
  
  // Time
  today: { en: 'Today', ar: 'اليوم' },
  yesterday: { en: 'Yesterday', ar: 'أمس' },
  tomorrow: { en: 'Tomorrow', ar: 'غداً' },
  now: { en: 'Now', ar: 'الآن' },
  
  // Common words
  yes: { en: 'Yes', ar: 'نعم' },
  no: { en: 'No', ar: 'لا' },
  ok: { en: 'OK', ar: 'موافق' },
  done: { en: 'Done', ar: 'تم' },
  retry: { en: 'Retry', ar: 'إعادة المحاولة' },
  refresh: { en: 'Refresh', ar: 'تحديث' },
  download: { en: 'Download', ar: 'تحميل' },
  upload: { en: 'Upload', ar: 'رفع' },
  view: { en: 'View', ar: 'عرض' },
  hide: { en: 'Hide', ar: 'إخفاء' },
  show: { en: 'Show', ar: 'إظهار' },
  select: { en: 'Select', ar: 'اختيار' },
  deselect: { en: 'Deselect', ar: 'إلغاء الاختيار' },
  all: { en: 'All', ar: 'الكل' },
  none: { en: 'None', ar: 'لا شيء' },
  more: { en: 'More', ar: 'المزيد' },
  less: { en: 'Less', ar: 'أقل' },
};

// Component-specific labels
export const buttonLabels: ArabicLabels = {
  primary: { en: 'Primary Button', ar: 'زر أساسي' },
  secondary: { en: 'Secondary Button', ar: 'زر ثانوي' },
  outline: { en: 'Outline Button', ar: 'زر محيطي' },
  text: { en: 'Text Button', ar: 'زر نصي' },
  ghost: { en: 'Ghost Button', ar: 'زر شفاف' },
  pin: { en: 'Pin', ar: 'تثبيت' },
  unpin: { en: 'Unpin', ar: 'إلغاء التثبيت' },
  nav: { en: 'Navigation', ar: 'تنقل' },
};

export const formLabels: ArabicLabels = {
  firstName: { en: 'First Name', ar: 'الاسم الأول' },
  lastName: { en: 'Last Name', ar: 'اسم العائلة' },
  email: { en: 'Email', ar: 'البريد الإلكتروني' },
  password: { en: 'Password', ar: 'كلمة المرور' },
  confirmPassword: { en: 'Confirm Password', ar: 'تأكيد كلمة المرور' },
  phone: { en: 'Phone', ar: 'الهاتف' },
  address: { en: 'Address', ar: 'العنوان' },
  city: { en: 'City', ar: 'المدينة' },
  country: { en: 'Country', ar: 'البلد' },
  zipCode: { en: 'ZIP Code', ar: 'الرمز البريدي' },
  message: { en: 'Message', ar: 'رسالة' },
  subject: { en: 'Subject', ar: 'الموضوع' },
  description: { en: 'Description', ar: 'الوصف' },
  title: { en: 'Title', ar: 'العنوان' },
  content: { en: 'Content', ar: 'المحتوى' },
  notes: { en: 'Notes', ar: 'ملاحظات' },
  comments: { en: 'Comments', ar: 'تعليقات' },
};

export const tableLabels: ArabicLabels = {
  noData: { en: 'No data available', ar: 'لا توجد بيانات متاحة' },
  noResults: { en: 'No results found', ar: 'لم يتم العثور على نتائج' },
  loading: { en: 'Loading data...', ar: 'جاري تحميل البيانات...' },
  rowsPerPage: { en: 'Rows per page', ar: 'صفوف في الصفحة' },
  of: { en: 'of', ar: 'من' },
  page: { en: 'Page', ar: 'صفحة' },
  first: { en: 'First', ar: 'الأولى' },
  last: { en: 'Last', ar: 'الأخيرة' },
  previous: { en: 'Previous', ar: 'السابق' },
  next: { en: 'Next', ar: 'التالي' },
  total: { en: 'Total', ar: 'المجموع' },
  selected: { en: 'Selected', ar: 'محدد' },
  selectAll: { en: 'Select All', ar: 'تحديد الكل' },
  clearSelection: { en: 'Clear Selection', ar: 'مسح التحديد' },
};

export const calendarLabels: ArabicLabels = {
  january: { en: 'January', ar: 'يناير' },
  february: { en: 'February', ar: 'فبراير' },
  march: { en: 'March', ar: 'مارس' },
  april: { en: 'April', ar: 'أبريل' },
  may: { en: 'May', ar: 'مايو' },
  june: { en: 'June', ar: 'يونيو' },
  july: { en: 'July', ar: 'يوليو' },
  august: { en: 'August', ar: 'أغسطس' },
  september: { en: 'September', ar: 'سبتمبر' },
  october: { en: 'October', ar: 'أكتوبر' },
  november: { en: 'November', ar: 'نوفمبر' },
  december: { en: 'December', ar: 'ديسمبر' },
  sun: { en: 'Sun', ar: 'أحد' },
  mon: { en: 'Mon', ar: 'اثنين' },
  tue: { en: 'Tue', ar: 'ثلاثاء' },
  wed: { en: 'Wed', ar: 'أربعاء' },
  thu: { en: 'Thu', ar: 'خميس' },
  fri: { en: 'Fri', ar: 'جمعة' },
  sat: { en: 'Sat', ar: 'سبت' },
  today: { en: 'Today', ar: 'اليوم' },
  clear: { en: 'Clear', ar: 'مسح' },
  apply: { en: 'Apply', ar: 'تطبيق' },
};

// Utility functions
export const getText = (label: ArabicText, language: 'en' | 'ar'): string => {
  return label[language] || label.en;
};

export const getLabel = (key: string, language: 'en' | 'ar', labels: ArabicLabels): string => {
  const label = labels[key];
  if (!label) return key;
  return getText(label, language);
};

export const getCommonLabel = (key: string, language: 'en' | 'ar'): string => {
  return getLabel(key, language, commonLabels);
};

export const getButtonLabel = (key: string, language: 'en' | 'ar'): string => {
  return getLabel(key, language, buttonLabels);
};

export const getFormLabel = (key: string, language: 'en' | 'ar'): string => {
  return getLabel(key, language, formLabels);
};

export const getTableLabel = (key: string, language: 'en' | 'ar'): string => {
  return getLabel(key, language, tableLabels);
};

export const getCalendarLabel = (key: string, language: 'en' | 'ar'): string => {
  return getLabel(key, language, calendarLabels);
};

// RTL utility functions
export const getDirection = (language: 'en' | 'ar'): 'ltr' | 'rtl' => {
  return language === 'ar' ? 'rtl' : 'ltr';
};

export const getTextAlign = (language: 'en' | 'ar'): 'left' | 'right' => {
  return language === 'ar' ? 'right' : 'left';
};

export const getMarginStart = (language: 'en' | 'ar'): string => {
  return language === 'ar' ? 'mr' : 'ml';
};

export const getMarginEnd = (language: 'en' | 'ar'): string => {
  return language === 'ar' ? 'ml' : 'mr';
};

export const getPaddingStart = (language: 'en' | 'ar'): string => {
  return language === 'ar' ? 'pr' : 'pl';
};

export const getPaddingEnd = (language: 'en' | 'ar'): string => {
  return language === 'ar' ? 'pl' : 'pr';
};

// CSS class utilities
export const getRTLClasses = (language: 'en' | 'ar'): string => {
  if (language === 'ar') {
    return 'rtl text-right';
  }
  return 'ltr text-left';
};

export const getFontFamily = (language: 'en' | 'ar'): string => {
  return language === 'ar' ? 'font-arabic' : 'font-sans';
};

export const getSpacingClasses = (language: 'en' | 'ar', baseClass: string): string => {
  if (language === 'ar') {
    return baseClass.replace(/ml-/g, 'mr-').replace(/pl-/g, 'pr-');
  }
  return baseClass;
};


