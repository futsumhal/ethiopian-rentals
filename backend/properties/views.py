
from rest_framework import generics
from .models import Property
from .serializers import PropertySerializer


class PropertyListView(generics.ListAPIView):
    serializer_class = PropertySerializer

    def get_queryset(self):
        return Property.objects.filter(is_available=True)


class PropertyDetailView(generics.RetrieveAPIView):
    serializer_class = PropertySerializer

    def get_queryset(self):
        return Property.objects.filter(is_available=True)
