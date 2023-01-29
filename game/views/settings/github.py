from django.shortcuts import redirect
from django.conf import settings
from django.urls import reverse
import requests

def login(request):
    client_id = settings.GITHUB_CLIENT_ID
    redirect_uri = request.build_absolute_uri(reverse('callback'))
    authorization_url = f'https://github.com/login/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&scope=user'
    return redirect(authorization_url)

def callback(request):
    code = request.GET.get('code')
    client_id = settings.GITHUB_CLIENT_ID
    client_secret = settings.GITHUB_CLIENT_SECRET
    redirect_uri = request.build_absolute_uri(reverse('callback'))
    response = requests.post('https://github.com/login/oauth/access_token', data={
        'client_id': client_id,
        'client_secret': client_secret,
    })