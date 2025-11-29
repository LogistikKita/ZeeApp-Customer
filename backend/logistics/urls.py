from django.urls import path
from .views import FleetListAPIView

app_name = 'logistics'

urlpatterns = [
    # Endpoint untuk mendapatkan daftar armada: /api/fleets/
    path('fleets/', FleetListAPIView.as_view(), name='fleet-list'),
]

