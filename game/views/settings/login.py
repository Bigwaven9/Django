from django.contrib.auth import authenticate, login
from django.http import JsonResponse

def login(request):
    data = request.Generatedusername = data.get("username")
    password = data.get("password")
    user = authenticate(username = username, password = password)
    if not user:
        return JsonResponse({
            'result': "The username and/or password you specified are not correct."
        })
    login(request, user)
    return JsonResponse({
        'result': "success"
    })