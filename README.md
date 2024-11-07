# Game Tic Tac Toe

Cung cấp giao diện chơi gồm 2 chế độ: PVP và PVE (tích hợp player AI)

Phiên bản 1.0 chỉ gồm bảng chơi 3x3

Tech stack:

- ReactJS + Vite
- Typescript

Runtime Environemt: NodeJS 20.12.2

## Docker Run

```
docker login
docker-compose build
docker tag tic-tac-toe trongnd04/tic-tac-toe:1.0
docker push trongnd04/tic-tac-toe:1.0
docker-compose up -d
```
