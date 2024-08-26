export interface User {
    id?: number;
    user_name: string;
    first_name: string;
    last_name: string;
    email: string;
    user_status: string;  // 'I' - Inactive, 'A' - Active, 'T' - Terminated
    department?: string;
  }
  