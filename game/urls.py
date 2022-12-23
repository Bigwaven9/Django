from django.urls import path
from game.views import *

urlpatterns = [
    path("", index, name = "index"),
    path("1", edward, name = "edward"),
    path("play/", play, name = "play")
]
