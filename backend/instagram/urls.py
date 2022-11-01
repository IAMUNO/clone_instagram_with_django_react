from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register("posts", views.PostViewSet, basename='posts')
router.register(r"posts/(?P<post_pk>\d+)/comments", views.CommentViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]