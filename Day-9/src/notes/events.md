
# ⚙️ WebSocket Events in Socket.IO

## 🔁 What is Event-Based Communication?
- WebSocket (via Socket.IO) uses **event-driven architecture**.
- Both client and server can **emit** (send) and **listen** to **events**.
- This enables real-time, bidirectional communication.

---

## ⚡ Built-in Events

These are pre-defined by **Socket.IO** and help manage connection lifecycle and errors:

| Event           | Description                                |
|------------------|--------------------------------------------|
| `connection`     | Triggered when a client connects           |
| `disconnect`     | Triggered when a client disconnects        |
| `connect_error`  | Triggered on connection failure            |
| `reconnect`      | Triggered when a client reconnects         |
| `error`          | Triggered on any general error             |

```js
// Example (Server Side)
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
```

---

## 🛠️ Custom Events

These are **user-defined** events used for your app-specific communication needs.

### 💡 Examples:
- `chatMessage`
- `userTyping`
- `joinRoom`
- `newNotification`

```js
// Server
socket.on("chatMessage", (msg) => {
  console.log("Message:", msg);
  io.emit("messageResponse", "Got it!");
});

// Client
socket.emit("chatMessage", "Hello, Server!");
socket.on("messageResponse", (res) => {
  console.log(res);
});
```

---

## 📋 Comparison Table

| 🔸 Type         | 🔹 Examples                               | ⚙️ Usage                              |
|------------------|--------------------------------------------|----------------------------------------|
| Built-in Events  | `connection`, `disconnect`, `error`        | Core WebSocket behavior                |
| Custom Events    | `chatMessage`, `typing`, `joinRoom`        | App-specific messaging and features    |

---

## 🚀 Why Event-Based?

- Efficient real-time communication
- Easy to scale with custom logic
- Perfect for **chat apps**, **games**, **live updates**

> WebSockets enable **low latency**, full-duplex communication between client and server using this flexible event model.
