import WebSocket, { WebSocketServer } from 'ws';

type Protocol = "Controller" | "App";

class NeukoWSS {
  private _wss: WebSocket.Server;
  private _clients: Map<WebSocket, Protocol>
  constructor() {
    this._wss = new WebSocketServer({ port: 1337 });
    this._clients = new Map();
  }

  private _setupProtocol(protocol: string): Protocol {
    return protocol === "App" ? protocol : "Controller";
  }

  private _onConnection(ws: WebSocket) {
    this._clients.set(ws, this._setupProtocol(ws.protocol));
    console.dir(this._clients);
    ws.on("open", this._onOpen.bind(this, ws));
    ws.on("message", this._onMessage.bind(this, ws));
    ws.on("close", this._onClose.bind(this, ws));
  }

  private _onOpen(ws: WebSocket) {
    ws.send(`Connected to the server as ${this._setupProtocol(ws.protocol)}.`);
    console.dir(this._clients);
  }

  private _onMessage(ws: WebSocket, data: string) {
    if(ws.protocol !== "Controller") {
      return;
    }
    const forwardMessage = (protocol: Protocol, ws: WebSocket) => {
      if (protocol === "App") {
        ws.send(data);
      }
    }
    this._clients.forEach(forwardMessage);
  }

  private _onClose(ws:WebSocket) {
    this._clients.delete(ws);
    console.dir(this._clients);
  }


  init() {
    this._wss.on('connection', this._onConnection.bind(this));
    return this;
  }

  close() {
    this._wss.close();
  }
}

export default () => new NeukoWSS().init();
