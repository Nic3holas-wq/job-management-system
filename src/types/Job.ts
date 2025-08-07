interface JobOwner{
  id: number;
  username: string;
  email: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name?: string;
  image?: string; 

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
  
  export interface JobApplication {
    cover_letter: string;
    created_at: string;
    id: number;
    job: Job;
    resume: string; 
    status: string;
    user: User; // The user who applied for the job
}