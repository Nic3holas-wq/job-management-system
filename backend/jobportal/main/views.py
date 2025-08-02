from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated,AllowAny
from django.contrib.auth.hashers import make_password
from .models import Job
from .serializers import JobSerializer
from .serializers import UserSerializer
from .models import Profile
from django.core.mail import send_mail
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.shortcuts import redirect
from django.core.signing import TimestampSigner, SignatureExpired, BadSignature
from django.core.mail import send_mail
from django.conf import settings
import json
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
import base64

# ✅ Function-based view for user profile
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    serializer = UserSerializer(user, context={'request': request})
    return Response(serializer.data)


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
signer = TimestampSigner()

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    data = request.data
    try:
        if User.objects.filter(email=data['email']).exists():
            return Response({'detail': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)

        # Encode and sign user data
        payload = json.dumps({
            'email': data['email'],
            'password': data['password'],
            'name': data['name']
        })

        signed_data = signer.sign(payload)
        encoded_data = base64.urlsafe_b64encode(signed_data.encode()).decode()

        activation_link = f"http://localhost:8000/api/activate/{encoded_data}/"


        # Send activation email
        try:
            send_verification_email(data['email'], activation_link)
        except Exception as e:
            print(f"Error sending email: {e}")

        return Response({'detail': 'Please check your email to activate your account.'}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



#upload profile picture
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_profile_picture(request):
    profile = request.user.profile
    profile.image = request.FILES['image']
    profile.save()
    print("File saved at:", profile.image.path)
    return Response({'detail': 'Profile picture updated successfully'})

# Email verification function
def send_verification_email(email, activation_link):
    subject = 'Activate Your Account'
    from_email = settings.DEFAULT_FROM_EMAIL
    to = [email]

    context = {
        'activation_link': activation_link,
    }

    html_content = render_to_string('activation_email.html', context)
    text_content = f'Please activate your account by clicking the following link: {activation_link}'

    msg = EmailMultiAlternatives(subject, text_content, from_email, to)
    msg.attach_alternative(html_content, "text/html")
    msg.send()

# Activation of account
@api_view(['GET'])
@permission_classes([AllowAny])
def activate_user(request, token):
    try:
        # Unsigned data must match exactly what was signed
        try:
            decoded_signed_data = base64.urlsafe_b64decode(token.encode()).decode()
            unsigned_data = signer.unsign(decoded_signed_data, max_age=86400)
        except (BadSignature, SignatureExpired, ValueError, base64.binascii.Error):
            return Response({'detail': 'Invalid or expired activation link.'}, status=status.HTTP_400_BAD_REQUEST)
        user_data = json.loads(unsigned_data)

        # Check again to avoid duplicates
        if User.objects.filter(email=user_data['email']).exists():
            return Response({'detail': 'User already activated.'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create(
            username=user_data['email'],
            email=user_data['email'],
            first_name=user_data['name'],
            password=make_password(user_data['password']),
            is_active=True
        )

        # Create profile or any related info
        Profile.objects.create(user=user)

        # Redirect to frontend (optional)
        return redirect("http://localhost:5173/signin?verified=true")

    except SignatureExpired:
        return Response({'detail': 'Activation link has expired.'}, status=status.HTTP_400_BAD_REQUEST)
    except BadSignature:
        return Response({'detail': 'Invalid activation link.'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

