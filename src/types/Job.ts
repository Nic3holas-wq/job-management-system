interface JobOwner{
  id: number;
  username: string;
  email: string;
}
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
    job_owner: JobOwner; 
  }
  