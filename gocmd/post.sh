#!/bin/bash

pushd {{.NAME}}
git init
go mod init github.com/andersjanmyr/{{.NAME}}
popd
rm -f post.sh
