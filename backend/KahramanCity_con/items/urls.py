from django.urls import path
from .  import views

urlpatterns = [
   
    path('', views.ItemListView.as_view(), name='item_list'),
    path('categorys/', views.CategoryListView.as_view(), name='category_list'),
    path('categorys/<slug:slug>/', views.CategoryDetailView.as_view(), name='category_detail'),
    path('<slug:category_slug>/<int:pk>/', views.ItemDetailView.as_view(), name='item_detail'),
    path('favorites/', views.FavoriteListView.as_view(), name='favorite-list'),
    path('favorites/add/', views.FavoriteCreateView.as_view(), name='favorite-add'),
    path('favorites/remove/<int:item_id>/', views.FavoriteDeleteView.as_view(), name='favorite-remove'),

]