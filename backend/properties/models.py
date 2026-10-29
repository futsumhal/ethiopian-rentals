
from django.db import models


class Property(models.Model):
    PROPERTY_TYPES = [
        ("house", "House"),
        ("apartment", "Apartment"),
        ("room", "Room"),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    property_type = models.CharField(
        max_length=20,
        choices=PROPERTY_TYPES,
    )
    price = models.DecimalField(max_digits=12, decimal_places=2)
    neighborhood = models.CharField(max_length=100)
    address = models.CharField(max_length=255, blank=True)
    bedrooms = models.PositiveSmallIntegerField(default=1)
    bathrooms = models.PositiveSmallIntegerField(default=1)
    furnished = models.BooleanField(default=False)
    advertiser_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=30)
    image_url = models.URLField(blank=True)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["-created_at"]

