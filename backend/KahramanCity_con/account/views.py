from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers
from .serializers import RegisterSerializer

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(username=email, password=password)  # Email yerine username alanını kullan
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({'error': 'Invalid credentials'}, status=400)
    
class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]  # Sadece giriş yapmış kullanıcılar erişebilir

    def get(self, request):
        # Doğrulanmış kullanıcıya özel bir veri döndürülebilir
        data = {
            "message": "This is protected data!",
            "user": request.user.username,  # Kullanıcının bilgileri
            "email": request.user.email,
        }
        return Response(data)
    
class RegisterView(APIView):
    permission_classes = [AllowAny]  # Herkes erişebilir

    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()  # Kullanıcıyı kaydet
            return Response({'message': 'User created successfully!'}, status=201)
        return Response(serializer.errors, status=400)