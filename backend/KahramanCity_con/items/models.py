from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=50, null =True, blank=True)
    slug = models.SlugField(max_length=50, null =True, unique=True, blank=True)

    def __str__(self):
        return self.name


class Item(models.Model):
    name = models.CharField(max_length=200, unique=True, verbose_name="Item Name", help_text="Enter item name")
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to="items/")
    latitude = models.FloatField()
    longitude = models.FloatField()
    category = models.ForeignKey(Category, null=True, on_delete = models.DO_NOTHING)

    def __str__(self):
        return self.name


class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="favorites")
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="favorited_by")
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'item')