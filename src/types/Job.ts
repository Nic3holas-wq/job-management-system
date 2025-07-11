export interface Job {
    id: number;
    title: string;
    description: string;
    company_name: string;
    location: string;
    salary: number;
    status: "active" | "inactive";
    created_at: string;
    updated_at: string;
  }
  