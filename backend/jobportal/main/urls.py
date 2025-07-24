# main/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobViewSet, register_user

router = DefaultRouter()
router.register('jobs', JobViewSet, basename='job')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register_user, name='register_user'),
]
