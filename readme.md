fast-deploy
---

### Usage
in server
```sh
g clone https://github.com/gavinning/fast-deploy.git

cd fast-deploy
npm i
npm run prd
```

### 本地项目
在项目根目录下创建``deploy.sh``
```sh
#!/bin/bash

folder="app/fe"
server="http://127.0.0.1:9500"
# cmd="npm%20i%20&&%20npm%20run%20build"
# cmd="npm%20install%20%26%26%20pm2%20startOrReload%20ecosystem.config.dev.json"
cmd=""

mkdir -p .deploy/
rm -f .deploy/**.tgz
file=`npm pack`
mv ${file} ./.deploy/

echo
echo "PACK: $file"
echo "FOLDER: $folder"
echo "CMD: ${cmd}"
echo
echo UPLOADING...
echo

curl -F "file=@./.deploy/${file}" \
"${server}/deploy?afterRun=${cmd}&folder=${folder}"

echo ---
echo "[deploy]: $server"
echo "[server]: $server"
echo
```

### 发布
发布项目到测试环境
```sh
sh ./deploy.sh
```