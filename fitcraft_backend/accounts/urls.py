from django.urls import path

from .views import LoginView, LogoutView, ProfileView, SessionView, SignupView


urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('session/', SessionView.as_view(), name='session'),
    path('profile/', ProfileView.as_view(), name='profile'),
]

