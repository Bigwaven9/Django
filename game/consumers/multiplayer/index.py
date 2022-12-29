from channels.generic.websocket import AsyncWebsocketConsumer
import json
from django.conf import settings
from django.core.cache import cache

class MultiPlayer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = None
        for i in range(1000):
            name = "room-%d" % (i)
            if not cache.has_key(name) or len(cache.get(name)) < settings.ROOM_CAPCACITY:
                self.room_name = name
                break
        
        if not self.room_name:
            return

        await self.accept()
        # print('accept')

        if not cache.has_key(self.room_name):
            cache.set(self.room_name, [], 3600)


        for player in cache.(self.room_name):
            await self.send(text_data = json.dumps({
                'event': "created players",
                'uuid': player['uuid'],
                'username': player['username'],
                'photo': player['photo'],
            }))

        self.room_name = "room"
        await self.channel_layer.group_add(self.room_name, self.channel_name)

    async def disconnect(self, close_code):
        print('disconnect')
        await self.channel_layer.group_discard(self.room_name, self.channel_name)

    async def create_player(self, data):
        players = cache.get(self.room_name)
        players.append({
            'uuid' : data['uuid'],
            'username': data['username'],
            'photo': data['photo'],
        })
        cache.set(self.room_name, players, 3600)

        await self.channel_layer.group_send(
            self, room_name,
            {
                'type': "group_create_player",
                'event': "created players",
                'uuid': data['uuid'],
                'photo': data['photo'],
                'username': data['username'],
            }
        )

    async def group_create_player(self, data):
        await self.send(text_data = json.dumps(data))

    async def receive(self, text_data):
        data = json.loads(text_data)
        print(data)
        if event == "created players":
            await self.create_player(data)
            