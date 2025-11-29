# Impor os untuk path media
import os

# ... (Kode lainnya yang sudah ada)

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Tambahan: Aplikasi Pihak Ketiga & Aplikasi Kita
    'rest_framework',
    'corsheaders',
    'logistics',           # APLIKASI KITA
]

# ... (Kode lainnya)

MIDDLEWARE = [
    # TAMBAHAN: Untuk mengizinkan Frontend React mengakses API
    'corsheaders.middleware.CorsMiddleware', 
    'django.middleware.security.SecurityMiddleware',
    # ... (Middleware lainnya)
]

# TAMBAHAN: CORS (Hanya untuk development codespaces)
CORS_ALLOW_ALL_ORIGINS = True

# ... (Kode lainnya)

# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'

# KONFIGURASI UPLOAD GAMBAR (MEDIA)
MEDIA_URL = '/media/'
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

