#!/bin/bash

git status
echo "Uncommited chcnges will be lost if you want to continue type 'yes'"

read flag

if [[ "$flag" != "yes" ]]; then
  exit 1
fi

if [[ -n "$1" ]]; then
    $remote = $1
    echo "---> deploy to remote:" $1
else
    $remote = "dokku@dokku-ovh1-003.radiokitsrv.org:audioasyl-prod"
    echo "---> deploy to default remote: dokku@dokku-ovh1-003.radiokitsrv.org:audioasyl-prod"
fi

git checkout -b deploy_production
git rm -rf ./ --cached

npm run build
npm run build-backend

git add dist/* -f
git add migrations/*
git add .buildpacks
git add database.json
git add package.json
git add server.build.js -f

git commit -m 'deploy-'`date +%s`

git remote add radio_dokku_prod dokku@dokku-ovh1-003.radiokitsrv.org:audioasyl-prod
git push radio_dokku_prod deploy_production:master -f
git remote remove radio_dokku_prod

echo "---> cleaning"

git clean -df
git checkout -
git branch -d deploy_production
