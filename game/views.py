from django.http import HttpResponse

def index(request):
    return HttpResponse("This is my first website! * 2 + '\n'")

def play(request):
    line1 = '<h1 style="text-align: center">游戏界面</h1>'
    return HttpResponse(line1)
