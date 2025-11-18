from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from .models import Profile


User = get_user_model()


class ProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Profile
        fields = [
            'email',
            'username',
            'full_name',
            'bio',
            'gender',
            'age',
            'height_cm',
            'weight_kg',
            'avatar',
        ]
        read_only_fields = ['email', 'username', 'avatar']


class ProfileUpdateSerializer(ProfileSerializer):
    avatar = serializers.ImageField(required=False, allow_null=True)

    class Meta(ProfileSerializer.Meta):
        read_only_fields = ['email', 'username']


class SignupSerializer(serializers.Serializer):
    full_name = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError('Email already registered.')
        return value.lower()

    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        email = validated_data['email'].lower()
        user = User.objects.create_user(
            username=email,
            email=email,
            password=validated_data['password'],
            first_name=validated_data['full_name'],
        )
        profile = user.profile
        profile.full_name = validated_data['full_name']
        profile.save()
        return user

