from django.urls import path
from .  import views

urlpatterns = [
    path('login/', views.LoginView.as_view(), name='login'),
    path('protected-route/', views.ProtectedView.as_view(), name='protected'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('api/update-profile/', views.UpdateProfileView.as_view(), name='update-profile'),
]
