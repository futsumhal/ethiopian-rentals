
from rest_framework import serializers
from .models import Property


class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = [
            "id",
            "title",
            "description",
            "property_type",
            "price",
            "neighborhood",
            "address",
            "bedrooms",
            "bathrooms",
            "furnished",
            "advertiser_name",
            "phone_number",
            "image_url",
            "is_available",
            "created_at",
        ]
