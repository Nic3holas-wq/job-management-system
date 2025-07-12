#  Job Management Web Application

A full-stack **Job Management Web App** that allows users to create, view, update, and soft-delete job listings. It uses a Django + DRF backend, PostgreSQL for data storage, and a modern React + TypeScript + Tailwind CSS frontend.

---
## Project screenshots

<div style="display: flex; gap: 10px;">
  <img src="./screenshots/homepage.png" alt="Home Page" width="250"/>
  <img src="./screenshots/homepage2.png" alt="Job Form" width="250"/>
  <img src="./screenshots/createjob.png" alt="Job List" width="250"/>
    <img src="./screenshots/editjob.png" alt="Job List" width="250"/>
    <img src="./screenshots/jobdetail.png" alt="Job List" width="250"/>
    <img src="./screenshots/pagination.png" alt="Job List" width="250"/>
    <img src="./screenshots/edittoast.png" alt="Job List" width="250"/>
</div>


##  Tech Stack

**Backend**
- Django
- Django REST Framework
- PostgreSQL

**Frontend**
- React
- TypeScript
- Tailwind CSS
- Axios (for REST API communication)

---

##  Features

-  Create, update, view job listings
-  Soft-delete jobs (mark as inactive)
-  Filter jobs by company and location
-  Search jobs by title or company name
-  Pagination
-  Toast notifications



##  Backend Setup (Django + PostgreSQL)

###  1. Clone the repository

If you haven’t cloned the project yet, run:

```bash
git clone https://github.com/Nic3holas-wq/job-management-system.git
cd job-management-system
```
### 2. Navigate to `backend/` directory

```bash
cd backend

```
### 3. Create and activate a virtual environment
On macOS/Linux:
```bash
python -m venv venv
source venv/bin/activate
```
On Windows:
```bash
python -m venv venv
venv\Scripts\activate
```
### 4. Install Django, Django REST Framework, and other dependencies

```bash
pip install -r requirements.txt
```
### 5. Create the Django project

```bash
django-admin startproject jobportal .
```
### 6. Create the app

```bash
python manage.py startapp main
```
### 7. Register the app and REST framework in jobportal/settings.py
Add 'main' and 'rest_framework' to the INSTALLED_APPS list:
```bash
INSTALLED_APPS = [
    ...
    'rest_framework',
    'main',
]
```
### 8. Configure PostgreSQL database in jobportal/settings.py
Update the DATABASES section like so:
```bash
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'your_db_name',
        'USER': 'your_db_user',
        'PASSWORD': 'your_db_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```
Ensure PostgreSQL is installed, running, and the database exists.

### 9. Run initial migrations
```bash
python manage.py migrate
```

### 10. (Optional) Create a superuser
```bash
python manage.py createsuperuser
```
Follow the prompts to set up an admin account.

### 11. Run the development server
```bash
python manage.py runserver 0.0.0.0:8000
```
Your backend is now running and can be accessed from:
```bash
http://<your-local-ip>:8000/api/
```

##  Frontend Setup (React + TypeScript + Tailwind CSS)

Follow these steps to set up and run the frontend of the application.

###  1. Clone the repository

If you haven’t cloned the project yet, run:

```bash
git clone https://github.com/Nic3holas-wq/job-management-system.git
cd job-management-system
```

### 2. Install frontend dependencies
Make sure you're in the job-management-system folder:

```bash
npm install
```

### 3. Start the frontend development server
```bash
npm run dev
```
Once it starts, open your browser and go to:

```bash
http://localhost:5173
```

 #### Additional Configuration (if needed)
 If Tailwind CSS is not yet installed, install and configure it:

 ```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
Update tailwind.config.js:
```bash
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```
Update src/index.css:
```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```
