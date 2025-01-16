from django.contrib import admin
from .models import Item, Category, Favorite

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    list_display_links = ('name',)
    search_fields = ('name', 'description')
    

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Favorite)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('user', 'item',)
