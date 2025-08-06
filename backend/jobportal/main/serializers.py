# main/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Job, JobApplication

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(source='profile.image', read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'image']
        
    def get_profile_picture(self, obj):
        request = self.context.get('request')
        if hasattr(obj, 'profile') and obj.profile.image:
            return request.build_absolute_uri(obj.profile.image.url)
        return None
    
class JobApplicationSerializer(serializers.ModelSerializer):
    job = JobSerializer(read_only=True)  # For reading full job info
    job_id = serializers.PrimaryKeyRelatedField(queryset=Job.objects.all(), write_only=True, source='job')  # For writing job by ID
    user = UserSerializer(read_only=True)  # Optional: return full user info

    class Meta:
        model = JobApplication
        fields = ['id', 'job', 'job_id', 'user', 'resume', 'cover_letter', 'status', 'created_at']
        read_only_fields = ['user', 'created_at']

