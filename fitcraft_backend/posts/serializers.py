from rest_framework import serializers

from .models import Post


class PostSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='user.profile.full_name', read_only=True)
    avatar = serializers.ImageField(source='user.profile.avatar', read_only=True)

    class Meta:
        model = Post
        fields = [
            'id',
            'author',
            'avatar',
            'caption',
            'hashtags',
            'image',
            'created_at',
        ]
        read_only_fields = ['id', 'author', 'avatar', 'created_at']

