from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=50, null =True, blank=True)
    slug = models.SlugField(max_length=50, null =True, unique=True, blank=True)

    def __str__(self):
        return self.name

class Item(models.Model):
    name = models.CharField(max_length=200, unique=True, verbose_name="Kurs Adı", help_text="Kursun adını giriniz")
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to="items/")
    latitude = models.FloatField()
    longitude = models.FloatField()
    category = models.ForeignKey(Category, null=True, on_delete = models.DO_NOTHING)

    def __str__(self):
        return self.name
