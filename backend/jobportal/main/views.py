from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Job
from .serializers import JobSerializer

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.filter(status='active')
    serializer_class = JobSerializer

    def get_queryset(self):
        if self.action == 'list':
            return Job.objects.filter(status='active')
        return Job.objects.all()

    @action(detail=True, methods=['patch'])
    def deactivate(self, request, pk=None):
        job = self.get_object()
        job.status = 'inactive'
        job.save()
        return Response({'status': 'Job deactivated'})
