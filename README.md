# bullboard-docker

## build docker image
`docker build -t serebano/bullboard .`

## env
```
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=foobared
REDIS_TLS=false

QUEUES=myqueue1,myqueue2
PORT=7010
```

## dashboard
`http://localhost:7010/ui`


## add api
`http://localhost:7010/add/myqueue1/videos?name=serebano&opts[delay]=500&opts[jobId]=job1`

## dev
`env $(cat .env | grep ^[A-Z] | xargs) nodemon index.js`