from rest_framework import serializers
from .models import Item, Category, Favorite

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'
        def get_is_favorite(self, obj):
            user = self.context['request'].user
            return obj.is_favorite(user)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class FavoriteSerializer(serializers.ModelSerializer):
    item_details = ItemSerializer(source='item', read_only=True)

    class Meta:
        model = Favorite
        fields = ['id', 'user', 'item', 'added_at', 'item_details']