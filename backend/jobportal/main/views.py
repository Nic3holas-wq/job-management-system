from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .models import Job
from .serializers import JobSerializer

# ✅ Class-based view for Jobs
class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.filter(status='active')
    serializer_class = JobSerializer

    @action(detail=True, methods=['patch'], url_path='deactivate')
    def deactivate(self, request, pk=None):
        try:
            job = self.get_object()
            job.status = 'inactive'
            job.save()
            return Response({'status': 'Job deactivated successfully'})
        except Job.DoesNotExist:
            return Response({'error': 'Job not found'}, status=status.HTTP_404_NOT_FOUND)

# ✅ Standalone function-based view for user registration
@api_view(['POST'])
def register_user(request):
    data = request.data
    try:
        if User.objects.filter(email=data['email']).exists():
            return Response({'detail': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create(
            username=data['email'],  # Or a proper username field
            email=data['email'],
            first_name=data['name'],
            password=make_password(data['password']),
        )
        return Response({'detail': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
