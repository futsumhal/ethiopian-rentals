
from django.contrib import admin
from .models import Property


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "property_type",
        "price",
        "neighborhood",
        "is_available",
        "created_at",
    )

    list_filter = (
        "property_type",
        "is_available",
        "furnished",
    )

    search_fields = (
        "title",
        "neighborhood",
        "advertiser_name",
        "phone_number",
    )

    list_editable = ("is_available",)

