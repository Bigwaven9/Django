from django.http import JsonResponse
from django.contrib.auth import login
from django.contrib.auth.models import User
from game.models.player.player import Player

def register(request):
    data = request.GET
    username = data.get("username", "").strip()
    password = data.get("password", "").strip()
    password_confirm = data.get("password_confirm", "").strip()
    if not username or not password:
        return JsonResponse({
            'result': "Username and password are required"
        })
    if password != password_confirm:
        return JsonResponse({
            'result': "The passwords you entered do not match"
        })
    if User.objects.filter(username = username).exists():
        return JsonResponse({
            'result': "The username has already existed"
        })
    user = User(username = username)
    user.set_password(password)
    user.save()
    Player.objects.create(user = user, photo = "https://app4299.acapp.acwing.com.cn/static/image/test_image.jpeg")
    login(request, user)
    return JsonResponse({
        'result': "success",
    })