from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # TAMBAHAN: Jalur untuk API Backend kita
    path('api/', include('logistics.urls')), # Semua API dimulai dengan /api/
]

# Tambahan agar bisa membuka file gambar saat development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

