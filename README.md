Nestjs

Pipe --> Guard --> Controller --> Service --> Repository

Pipe: Validate data contained in the request
Guard: Make sure the user is authenticate
Controller: Handles incoming request
service: Handles data access and business logic
modules: Groups together code
Filters Handles errors that occur during the request handling
interceptor: adds extra logic to incoming requests or outgoing response
repositories: handles data stored in db

install nestjs cli
npm install -g @nestjs/cli

generate new project
nest new nameApp
