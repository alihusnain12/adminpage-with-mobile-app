import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      "My Clients": "My Clients",
      "Edit Client Information": "Edit Client Information",
      "Change Status for": "Change Status for",
      "Save": "Save",
      "Cancel": "Cancel",
      "Client Name": "Client Name",
      "Contact Info": "Contact Info",
      "Number": "Number",
      "Plan Status": "Plan Status",
      "Action": "Action",
      "Search": "Search",
      "Filter": "Filter",
      "Status": "Status",
      "navbarTitle": "Navbar Title",
      "usersPage": "Users Page",
      "business": "Business",
      "checkIn": "Check In",
      "packages": "Packages",
      "payment": "Payment",
      "Image": "Image",
      "Title": "Title",
      "Category": "Category",
      "Address": "Address",
      "Description": "Description",
      "Action": "Action",
      "Edit": "Edit",
      "Delete": "Delete",
      "Create Packages": "Create Packages",
      "Price": "Price",
      "Submit": "Submit",
      "Business Details": "Business Details",
      "Name": "Name",
      "Package Details": "Package Details",
      "Users":"Users",
      "Users Page":'Users Page'
    }
  },
  ar: {
    translation: {
      "My Clients": "عملائي",
      "Edit Client Information": "تعديل معلومات العميل",
      "Change Status for": "تغيير الحالة لـ",
      "Save": "حفظ",
      "Cancel": "إلغاء",
      "Client Name": "اسم العميل",
      "Contact Info": "معلومات الاتصال",
      "Number": "الرقم",
      "Plan Status": "حالة الخطة",
      "Action": "الإجراء",
      "Search": "بحث",
      "Filter": "تصفية",
      "Status": "الحالة",
      "navbarTitle": "عنوان الشريط العلوي",
      "usersPage": "صفحة المستخدمين",
      "business": "عمل",
      "checkIn": "تسجيل الوصول",
      "packages": "رزم",
      "payment": "الدفع",
      "Image": "صورة",
      "Title": "عنوان",
      "Category": "فئة",
      "Address": "عنوان",
      "Description": "وصف",
      "Action": "الإجراء",
      "Edit": "تعديل",
      "Delete": "حذف",
      "Create Packages": "إنشاء رزم",
      "Price": "السعر",
      "Submit": "إرسال",
      "Business Details": "تفاصيل العمل",
      "Name": "الاسم",
      "Package Details": "تفاصيل الرزمة",
      "Users":'المستخدمين',
      " Users Page":'صفحة المستخدمين'
    }
  }
};

i18n
  .use(LanguageDetector)  // Detects language based on browser settings
  .use(initReactI18next)   // Initializes react-i18next
  .init({
    resources,
    fallbackLng: "en",  // Default language when no match is found
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
