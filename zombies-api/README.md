This project was created for a job interview.

The goal was to prepare an API, that'll provide certain functionalities. 

The user stories are the following:
1. >I want to display details about selected zombie (name and creation date);
2. >I want to display items that this zombie has;
3. >I want to see total value of zombie’s items in 3 currencies, PLN/EU/USD;
4. >I want to add and remove items from the zombie;
5. >I want to see a list of zombies (create/update/remove them also);

During the 48 hour time window out of all user stories I managed to implement 1., 2. and 5. The user stories 3. and 4. were only partially implemented. I also managed to dockerzie this project.

For the 3rd user story I'm missing the implementation which would 
calculate the total value of the items in Euro and Dollars. Currently all values showed inside the output are the total value in PLN. If I had more time to develop this functionality, I would approach it by using the HttpService class to fetch data from the NBP API to 
get the value of the Dollar and the Euro.

As far as the 4th user story is concerned I've only managed to create an adding function which is not working the way I wanted. Currently it always sets a default zombieId inside the new item unless I choose a specific zombieId. My goal was to set it to a value like null, which is impossible in this current state, because the DB creation scripts set the `zombie_id` as `NOT NULL`.

In this current state I managed to create only tests for the controller. Honestly I'm not very happy how they are looking right now and how they test. It was my first time I worked with `Jest` and my experience with it was very good, however I should have probably stayed with Mocha, because it's more familiar to me.
Obviously I'm missing tests for the `ZombiesService`, `ItemsService` and `ItemsController`. My approach while testing controllers would be testing the endpoints for different kinds of request responds. An example is provided in the tests for the `ZombieController`. Additionally I would also provide tests that would result in codes like `400`, `403` and `404`. In the controller tests I would stub the functions and test only the behaviour of the endpoint, not the business logic. The business logic would be tested in service tests.

After implementing all functionalities and tests I would focus on integrating Swagger into the project to provide a better documentation for the user.

Summarized, this was my first project I've ever done with `Nest.js`. I really liked it because of its file structure (separation into module, service, controller). The readability of the code is much better and wrtiting code in `Nest.js` is very pleasant. I'm still trying to get a better grip on `Typescript`, since there are some spots in the code where I practice using return values in the function declaration and in some other cases I'm not using it at all. Nevertheless I really enjoyed working on it and honestly would be very excited working in `Nest.js`.