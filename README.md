# DeveloTalks

| This project is currently a work in progress. Keep in mind that you are likely to encounter features that do not work exactly as expected while using it. |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

## Introduction

`DeveloTalks` is a social platform aiming to be the #1 developer meeting center. You can start new conversations by creating a new room, or you can join an existing room with a topic that interests you.

Chatting with `voice`, `video`, or `text`! You can find developers to talk to from all around the world, at any time of the day!

Using DeveloTalks,

- You can **expand your networks**,
- You can **share your screen and solve your technical problems with people**,
- You can **talk about a new technology**,
- You can **talk in your native language** or **practice your English with others**,
- You can **get career advice** or you can **share your experiences with others**,
- You can **get prepared with mock interviews**,

and more!

![Preview](./develotalks-readme.png)


## Installation & Running in Development

> Make sure you have **Node.js** installed on your system.

### Backend

1 - Open your terminal and navigate to the `backend` folder

```bash
$ cd backend
```

2 - Install dependencies via npm

```bash
$ npm install
```

3 - Run the backend in development by using the following command

```bash
$ npm run watch
```

### Frontend

1 - Open your terminal and navigate to the `frontend` folder

```bash
$ cd frontend
```

2 - Install dependencies via npm

```bash
$ npm install
```

3 - Run the frontend in development by using the following command

```bash
$ npm run serve
```

After that, you should be able to see the app at [http://localhost:8080](http://localhost:8080) in your browser.

## Tests

### Backend

1 - Open your terminal and navigate to the `backend` folder

```bash
$ cd backend
```

2 - Run the tests by using the following command

```bash
$ npm run test
```

## Screenshots

### DeveloTalks homepage
![1-homepage-without-login](https://user-images.githubusercontent.com/59365742/211544488-8f07390f-9cb0-459a-89f8-4d49cbd98e17.png)

### The homepage after user login
![2-homepage-after-login](https://user-images.githubusercontent.com/59365742/211544495-abaee624-c5a2-48eb-b788-ada627983b4d.png)

### The modal for creating a new room
![3-create-room](https://user-images.githubusercontent.com/59365742/211544501-be73d9ee-3d77-49ce-8aab-1cae418417ff.png)

### The redirected page after automatically joining the created room
![4-after-creating-a-room](https://user-images.githubusercontent.com/59365742/211544504-05d01561-5554-47c1-a0b7-aa5ae7c43892.png)

### The button on the top of the page that the user can use to return to the room they are connected to
![5-seeing-other-rooms-without-leaving](https://user-images.githubusercontent.com/59365742/211544507-1011a5d8-044a-4c16-8e6b-b892d42dc60e.png)

### The homepage displayed by a second user
![6-user2-homepage-without-logging](https://user-images.githubusercontent.com/59365742/211544508-3c08fcc9-ccf9-4c8e-a9fc-b046886cc148.png)

### The homepage that the second user sees after logging in
![7-user2-after-logging-in](https://user-images.githubusercontent.com/59365742/211544513-bde724ea-87e9-4241-aa33-804919c074b7.png)

### User profile page
![8-seeing-user-profile](https://user-images.githubusercontent.com/59365742/211544519-f3b64cf4-3436-47b0-a9ed-0d28c089d1b8.png)

### Second user joining the room
![9-in-room](https://user-images.githubusercontent.com/59365742/211544521-6004ba08-ce02-468f-af09-c03b3bdfb6ef.png)

### The room from the first user side (with screen sharing on and mic off)
![10-user1-inroom](https://user-images.githubusercontent.com/59365742/211544525-29c4bec8-d88b-4617-9b73-dc95f7f285ae.png)

### The room from the second user side (with camera and mic on)
![11-user2-inroom](https://user-images.githubusercontent.com/59365742/211544532-1349023d-b19a-4a01-9e2b-106ecd563a52.png)

### Disabled join button when the room capacity is full
![12-full-room](https://user-images.githubusercontent.com/59365742/211544539-44dab5ae-744f-4003-8aa5-1df43a5a79d6.png)

### The room after the first user leaves
![13-user1-left](https://user-images.githubusercontent.com/59365742/211544541-d614a1be-f513-4e5b-9a38-10fc5b685fe2.png)

### Empty participant area on the room card after the user leaves
![14-user1-not-exist-on-card](https://user-images.githubusercontent.com/59365742/211544545-401bfeef-502a-4e44-9ce7-382272719f35.png)

### Settings page for updating the profile
![15-profile-settings](https://user-images.githubusercontent.com/59365742/211544547-abbab773-7201-49f5-bffc-249a88d147e0.png)

## License
MIT License

Copyright (c) 2020 Deniz Ozkan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
