import json
import os

from http.server import HTTPServer, BaseHTTPRequestHandler


def rt(tar):
  tar = str(tar)
  data = json.loads(open(f'data/{tar}','r').read())
  temp = dict()
  if len(tar) > 10:
    temp['location'] = data['data']['room']['location']
    if data['data'].get('agent').get('name'):
      temp['title'] = data['data'].get('agent').get('name')
  else:
    temp['location'] = list()
    for i in data['data']['item']['random_location'].split(','):
      temp['location'].append(float(i))
    temp['location'].reverse()
    if data['data'].get('agent'): temp['title'] = data['data']['agent'].get('agent_title')
  return temp





class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response_only(200, 'OK')
        t = self.path[1:]
        try:
          print(rt(t))
        except: 
          print('fail')
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(rt(t).encode('utf-8'))


if __name__ =='__main__':
    server = HTTPServer(('', 8000), MyHandler)
    print('Started WebServer')
    print('Press ^c to quit webserver')
    server.serve_forever()