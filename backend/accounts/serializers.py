from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validate_date):
        user = User.objects.create(username=validate_date["username"])
        user.set_password(validate_date["password"])
        user.save()
        return user

    class Meta:
        model = User
        fields = ['pk', 'username', 'password']


class SuggestionUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'name', 'avatar_url']
