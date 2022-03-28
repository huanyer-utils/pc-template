#!/bin/bash
# build.sh
#

basename=$1;
runenv=$2;
runtype=$3;

echo "----------------------------------"

if [ ! -n "$basename" ]; then
  read -p "无basename传入，请输入basename : " basename
fi

if [ ! -n "$runenv" ]; then
  echo "请选择打包环境，输入 1 或 2"
  select runenv in dev pro;
  do
    break
  done
fi

if [ ! -n "$runtype" ]; then
  echo "请选择运行模式，输入 1 或 2"
  select runtype in common micro;
  do
    break
  done
fi

echo "basename为： $basename  打包环境为： $runenv 运行模式为： $runtype 开始打包--------"

if [ "$runenv" = "dev" ];then
  cross-env REACT_APP_RUNTYPE="$runtype" REACT_APP_BASENAME="$basename" dotenv -e .env.development ./node_modules/.bin/hy-script build
else
  cross-env REACT_APP_RUNTYPE="$runtype" REACT_APP_BASENAME="$basename" dotenv -e .env.production ./node_modules/.bin/hy-script build
fi