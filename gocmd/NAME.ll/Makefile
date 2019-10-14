sources = main.go \
					$(wildcard pkg/*/*.go) \
					$(wildcard internal/*/*.go)

dist/{{lowercaseletters .NAME}}-linux: $(sources)
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -installsuffix cgo -ldflags '-s' -o dist/{{lowercaseletters .NAME}}-linux

dist/{{lowercaseletters .NAME}}-osx: $(sources)
	CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 go build -installsuffix cgo -ldflags '-s' -o dist/{{lowercaseletters .NAME}}-osx

dist/{{lowercaseletters .NAME}}.exe: $(sources)
	CGO_ENABLED=0 GOOS=windows GOARCH=386 go build -installsuffix cgo -ldflags '-s' -o dist/{{lowercaseletters .NAME}}.exe

.PHONY: build run tag release clean
build: dist/{{lowercaseletters .NAME}}-linux dist/{{lowercaseletters .NAME}}-osx dist/{{lowercaseletters .NAME}}.exe

run:
	go run main.go

tag:
	./tag.sh $(VERSION)

release: tag build
	./release.sh goose $(VERSION) dist/*

clean :
	-rm -r dist

