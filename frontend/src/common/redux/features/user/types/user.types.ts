export interface User {
  id: string;
  doc_type: string;
  doc_number: string;
  email: string;
  full_name: string;

  is_active: boolean;
  is_superuser: boolean;

  is_2fa_enabled: boolean;
}
