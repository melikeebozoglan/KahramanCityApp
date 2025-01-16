from rest_framework import generics
from .models import Item, Category, Favorite
from .serializers import ItemSerializer, CategorySerializer, FavoriteSerializer
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
    
class FavoriteListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Kullanıcının favorilerini listele
        favorites = Favorite.objects.filter(user=request.user)
        serializer = FavoriteSerializer(favorites, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class FavoriteCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Favorilere öğe ekle
        item_id = request.data.get('item_id')
        try:
            item = Item.objects.get(id=item_id)
        except Item.DoesNotExist:
            return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

        # Favori oluştur veya zaten varsa hata döndür
        favorite, created = Favorite.objects.get_or_create(user=request.user, item=item)
        if not created:
            return Response({"message": "Item is already in favorites"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = FavoriteSerializer(favorite)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class FavoriteDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, item_id):
        # Favorilerden öğe çıkar
        try:
            favorite = Favorite.objects.get(user=request.user, item_id=item_id)
            favorite.delete()
            return Response({"message": "Item removed from favorites"}, status=status.HTTP_204_NO_CONTENT)
        except Favorite.DoesNotExist:
            return Response({"error": "Favorite not found"}, status=status.HTTP_404_NOT_FOUND)