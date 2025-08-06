# main/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    JobViewSet,
    register_user,
    get_user_profile,
    upload_profile_picture,
    activate_user,
    get_my_applications,
    JobApplicationCreateView
)

router = DefaultRouter()
router.register('jobs', JobViewSet, basename='job')

urlpatterns = [
    path('', include(router.urls)),

    # User endpoints
    path('register/', register_user, name='register_user'),
    path('user/', get_user_profile, name='user-profile'),
    path('user/upload-picture/', upload_profile_picture, name='upload-picture'),
    path('activate/<str:token>/', activate_user, name='activate_user'),

    # Job application endpoints
    path('apply/', JobApplicationCreateView.as_view(), name='job-apply'),
    path('applications/', get_my_applications),
]
