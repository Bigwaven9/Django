from django.http import HttpResponse

def index(request):
    return HttpResponse("This is my first website! * 2 + '\n'")
