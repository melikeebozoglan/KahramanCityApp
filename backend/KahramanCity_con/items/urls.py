from django.urls import path
from .  import views

urlpatterns = [
   
    path('', views.ItemListView.as_view(), name='item_list'),
    path('categorys/', views.CategoryListView.as_view(), name='category_list'),
    path('categorys/<slug:slug>/', views.CategoryDetailView.as_view(), name='category_detail'),
    path('<slug:category_slug>/<int:pk>/', views.ItemDetailView.as_view(), name='item_detail'),
    path('toggle-favorite/', views.ToggleFavoriteView.as_view(), name='toggle-favorite'),
]
