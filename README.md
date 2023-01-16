NOTES
```
免密登陆

cd .ssh/
vim config

Host server
  HostName xxx.xx.xx.xxx
  User vagrant
  
ssh-keygen
ssh-copy-id server
```

```
配置docker

在acserver上scp
scp .bashrc .vimrc .tmux.conf server: 


sudo apt-get update
sudo apt-get install tmux
跟着 https://docs.docker.com/engine/install/ubuntu/


scp /var/lib/acwing/docker/images/docker_lesson_1_0.tar server:
docker load -i docker_lesson_1_0.tar
docker run -p 20000:22 --name my_docker_server -itd docker_lesson:1.0


创建用户
adduser acs
usermod -aG sudo acs


挂起容器
Ctrl + p  Ctrl + q

id_rsa.pub上传到github
```
```
redis

python3 manage.py shell

from django.core.cache import cache
def clear():
    for key in cache.keys("*"):
        cache.delete(key)
        

django channel

daphne -b 0.0.0.0 -p 5015 acapp.asgi:application


uwsgi

uwsgi --ini scripts/uwsgi.ini
 
```
