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

Inversion of control Principle

Classes should not create instances of its dependencies on its own

DI Container flow

-   At start up, register all classes with the container
-   Container will figure out what each dependency each class has
-   We then ask the container to create an instance of a class for us
-   Container create all required dependencies and give us the instance
-   Constainer will hold into the created dependency instance and reuse them if needed

### UseInterceptors and ClassSerializerInterceptor
- To exclude field when response from api
- Not flexible (it will exclude fields all apis)


### Custom Interceptor
Create file Custom Interceptor and use that file instead of ClassSerializerInterceptor
- Interceptor can using a service to query db

- Note: To be anotation injectable, class need to register in module class and provider
[!Custom Interceptor](/mycv/custom-interceptor.png)
### Global Interceptor