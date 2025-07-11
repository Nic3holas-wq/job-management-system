# main/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Job
from .serializers import JobSerializer

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
