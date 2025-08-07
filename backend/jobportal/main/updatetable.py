from django.contrib.auth.models import User
from .models import Job

# Example: set all existing jobs to be owned by a specific user (e.g., admin)
user = User.objects.get(username='nicholasmurimi254@gmail.com')  # Replace with a valid username

for job in Job.objects.filter(job_owner__isnull=True):
    job.job_owner = user
    job.save()
