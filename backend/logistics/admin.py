from django.contrib import admin
from .models import Fleet

@admin.register(Fleet)
class FleetAdmin(admin.ModelAdmin):
    list_display = ('name', 'fleet_type', 'capacity', 'volume', 'order')
    list_display_links = ('name',)
    search_fields = ('name', 'description')
    list_filter = ('fleet_type',)
    list_editable = ('order',)

