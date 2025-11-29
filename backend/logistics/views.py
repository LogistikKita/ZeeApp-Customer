from rest_framework import generics
from .models import Fleet
from .serializers import FleetSerializer

class FleetListAPIView(generics.ListAPIView):
    """
    API View untuk mendapatkan daftar semua armada.
    Endpoint ini akan diakses oleh Frontend React.
    """
    queryset = Fleet.objects.all()
    serializer_class = FleetSerializer
    
    def get_queryset(self):
        return Fleet.objects.all().order_by('order')

