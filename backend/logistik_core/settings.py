"""
Django settings for logistik_core project.
"""

import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
SECRET_KEY = 'django-insecure-m+5g!o5e-1_2p5*b5i_&8g0e(53)e5n2b#^57&67b57y%w-52b'

DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    # Default Django Apps (TETAP DI ATAS)
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Aplikasi Pihak Ketiga
    'rest_framework',
    'corsheaders',
    
    # APLIKASI LOKAL KITA (Wajib didaftarkan)
    'logistics.apps.LogisticsConfig',
]

MIDDLEWARE = [
    # 1. Security
    'django.middleware.security.SecurityMiddleware',
    
    # 2. CORS (Wajib untuk komunikasi React <-> Django)
    'corsheaders.middleware.CorsMiddleware', 
    
    # 3. Session Middleware (WAJIB di sini, error tadi karena ini)
    'django.contrib.sessions.middleware.SessionMiddleware', 
    
    # 4. Common & Csrf
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    
    # 5. Authentication & Messages (WAJIB SETELAH Sessions)
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware', 
    
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'logistik_core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'logistik_core.wsgi.application'


# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'

# KONFIGURASI UPLOAD GAMBAR (MEDIA)
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(os.path.dirname(PROJECT_ROOT), 'media')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# PENTING: Untuk mengizinkan Frontend React mengakses API
CORS_ALLOW_ALL_ORIGINS = True

