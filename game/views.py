from django.http import HttpResponse

def edward(request):
    return HttpResponse("<h1>Edward</h1>")

def index(request):
    return HttpResponse("<h1>Edward</h1>")

def play(request):
    line1 = '<h1 style="text-align: center">游戏界面</h1>'
    return HttpResponse(line1)
