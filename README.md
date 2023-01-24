NOTES
```
cd .ssh/
vim config

Host server
  HostName xxx.xx.xx.xxx
  User vagrant
  
ssh-keygen
ssh-copy-id server
```

```
docker

在acserver上scp
scp .bashrc .vimrc .tmux.conf server: 


sudo apt-get update
sudo apt-get install tmux
https://docs.docker.com/engine/install/ubuntu/


scp dockerfilexxxxxx.tar server:
docker load -i docker_lesson_1_0.tar
docker run -p 20000:22 --name my_docker_server -itd docker_lesson:1.0


adduser acs
usermod -aG sudo acs


docker attach
Ctrl + p  Ctrl + q

id_rsa.pub to github
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
```
root:

   ~/acme.sh/acme.sh --renew -d bgvw.org -d www.bgvw.org
   /root/.acme.sh/bgvw.org/bgvw.org.key -> cert/acapp.key
   /root/.acme.sh/bgvw.org/fullchain.cer -> cert/acapp.pem


sudo /etc/init.d/nginx start
sudo nginx -s reload


```
