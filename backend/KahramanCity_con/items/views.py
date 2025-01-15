from rest_framework import generics
from .models import Item, Category, Favorite
from .serializers import ItemSerializer, CategorySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

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
    

class ToggleFavoriteView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        item_id = request.data.get("item_id")
        if not item_id:
            return Response({"error": "Item ID is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            item = Item.objects.get(id=item_id)
        except Item.DoesNotExist:
            return Response({"error": "Item not found."}, status=status.HTTP_404_NOT_FOUND)
        
        favorite, created = Favorite.objects.get_or_create(user=request.user, item=item)
        if not created:
            favorite.delete()
            return Response({"message": "Item removed from favorites."})
        return Response({"message": "Item added to favorites."})
