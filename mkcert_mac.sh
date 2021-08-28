cd client/data/certs
brew install mkcert
mkcert -install
mkcert example.com "*.example.com" example.test localhost 127.0.0.1 ::1