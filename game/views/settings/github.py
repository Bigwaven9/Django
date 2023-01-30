from django.conf import settings
from django.contrib.auth.models import User
from game.models.player.player import Player
from django.shortcuts import redirect, render
from game.views.settings.register import register
from rest_framework.response import Response
import requests
import json
import random

client_id = settings.GITHUB_CLIENT_ID
client_secret = settings.GITHUB_CLIENT_SECRET
redirect_uri = settings.REDIRECT

def github_login(request):
    return redirect(f'https://github.com/login/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}')

def github_callback(request):
    code = request.GET.get('code')
    response = requests.post(f'https://github.com/login/oauth/access_token?client_id={client_id}&client_secret={client_secret}&code={code}&redirect_uri={redirect_uri}', headers={'Accept': 'application/json'})
    access_token = response.json()['access_token']
    request.session['access_token'] = access_token
    headers = {
        'Authorization': f'Token {access_token}',
        'Accept': 'application/json'
    }
    user_info = requests.get('https://api.github.com/user', headers=headers)
    user_info_dict = user_info.json()
    
    username = user_info_dict.get('login', '')
    if not User.objects.filter(username=username).exists():
        photo = user_info_dict.get('avatar_url', '')
        password = "xr&q$nwx%#%uygmpxnx^iwt$kbm*mclh"
        register(username, password, photo)
    # return redirect('/')
    data = requests.post("https://bgvw.org/settings/token/", json = {
        'username': username,
        'password': "xr&q$nwx%#%uygmpxnx^iwt$kbm*mclh",
    }, 
    headers = {
        'Accept': 'application/json'
    }).json()

    context = {
        'access': data.get('access', ""),
        'refresh': data.get('refresh', ""),
    }
    return render(request, 'multiends/web.html', context)