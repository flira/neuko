import WebSocket, { WebSocketServer } from 'ws';

class NeukoWSS {
  private _wss: WebSocket.Server;
  constructor() {
    this._wss = new WebSocketServer({ port: 1337 });
  }

  init() {
    this._wss.on('connection', ws => {
      ws.on('open', () => {
        "Hello, client";
      }); 

    });
    return this;
  }

  close() {
    this._wss.close();
  }
}

export default () => new NeukoWSS().init();
