# main/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobViewSet

router = DefaultRouter()
router.register('jobs', JobViewSet, basename='job')

urlpatterns = [
    path('', include(router.urls)),
]
