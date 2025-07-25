# main/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobViewSet, register_user, get_user_profile

router = DefaultRouter()
router.register('jobs', JobViewSet, basename='job')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register_user, name='register_user'),
    path('user/', get_user_profile, name='user-profile'),
]
