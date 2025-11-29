from django.db import models

class Fleet(models.Model):
    # Pilihan Tipe Armada
    TYPE_CHOICES = [
        ('Small', 'Small (Pickup/Van)'),
        ('Medium', 'Medium (CDE)'),
        ('Large', 'Large (CDD)'),
        ('Heavy', 'Heavy (Fuso/Tronton)'),
    ]

    name = models.CharField("Nama Armada", max_length=100)
    fleet_type = models.CharField("Tipe", max_length=20, choices=TYPE_CHOICES, default='Small')
    capacity = models.CharField("Kapasitas", max_length=50, help_text="Contoh: 5 Ton")
    dimension = models.CharField("Dimensi", max_length=50, help_text="Contoh: 4.2 x 1.9 x 1.8 m")
    volume = models.CharField("Volume", max_length=50, help_text="Contoh: 14 CBM")
    description = models.TextField("Deskripsi", max_length=200)
    
    # Upload Foto (Membutuhkan Folder media di root)
    image = models.ImageField("Foto Armada", upload_to='fleets/', blank=True, null=True)
    
    order = models.IntegerField("Urutan Tampil", default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Armada"
        verbose_name_plural = "Daftar Armada"
        ordering = ['order']

