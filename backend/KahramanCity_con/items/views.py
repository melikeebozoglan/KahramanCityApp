from rest_framework import generics
from .models import Item, Category
from .serializers import ItemSerializer, CategorySerializer

# Item List View (GET request ile tüm itemları getirir)
class ItemListView(generics.ListAPIView):
    queryset = Item.objects.all()  # Tüm itemları getirir
    serializer_class = ItemSerializer  # Hangi serializer'ı kullanacağını belirler

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()  # Tüm Categoryları getirir
    serializer_class = CategorySerializer  # Hangi serializer'ı kullanacağını belirler

class CategoryDetailView(generics.ListAPIView):
    #lookup_field = "category__slug"
    serializer_class = ItemSerializer  # Hangi serializer'ı kullanacağını belirler 
    def get_queryset(self):
    # URL'den gelen slug'ı al
        slug = self.kwargs.get('slug')
        # Item'ları category__slug ile filtrele
        return Item.objects.filter(category__slug=slug)

class ItemDetailView(generics.RetrieveAPIView):
    #queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def get_queryset(self):
        return Item.objects.filter(slug=self.kwargs['category_slug'], pk=self.kwargs['pk'])