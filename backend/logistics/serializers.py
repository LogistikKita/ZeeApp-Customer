from rest_framework import serializers
from .models import Fleet

class FleetSerializer(serializers.ModelSerializer):
    """
    Serializer untuk model Fleet. Mengubah objek Python menjadi JSON
    yang akan dikonsumsi oleh Frontend React.
    """
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Fleet
        fields = ['id', 'name', 'fleet_type', 'capacity', 'dimension', 'volume', 'description', 'image_url', 'order']

    def get_image_url(self, obj):
        """
        Mendapatkan URL gambar lengkap, termasuk domain saat ini.
        """
        if obj.image:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.image.url)
        return None

