# max-backend-assessment-test


Coding task invitation for backend engineering

Dear fellow engineer,

We are delighted to let you know that we would like to proceed to the next step with you and try to get to know you better with a more personalized experience.

At this step, we invite you to complete a small programming task that can take you anywhere between a couple of hours up to a full day in total to complete.

Objective

This task is designed to provide an opportunity for you to demonstrate general NodeJS based restful API development knowledge in the sense that you:

write clean, structured, readable and maintainable code
create simple application components and building blocks
understand fetching, transforming and aggregating data from external APIs
maintain a well designed application state
craft a pleasant api consumer experience

Task

Create a small set of rest API endpoints using NodeJS that can be used for listing the names of Star Wars movies along with their opening crawls and comment counts, adding and listing anonymous comments for a movie, and getting the character list for a movie.

General requirements

The application should have basic documentation that lists available endpoints and methods along with their request and response signatures
The exact api design in terms of total number of endpoints and http verbs is up to you
Keep your application source code on a public Github repository
Provide a live demo url (Glitch, Netlify, Zeit Now and Heroku are good options, some of which also offer free sql databases).
Bonus, but not mandatory, if you can dockerize the development environment

Data requirements

The movie data should be fetched online from https://swapi.dev
Movie names in the movie list endpoint should be sorted by release date from earliest to newest and each movie should be listed along with opening crawls and count of comments
Comments should be stored in a SQL database
Error responses should be returned in case of errors



Character list requirements

Endpoint should accept sort parameters to sort by one of name or height in ascending or descending order
Endpoint should also accept a filter parameter to filter by gender
The response should also return metadata that contains the total number of characters that match the criteria along with the total height of the characters that match the criteria
The total height should be provided both in cm and in feet/inches. For instance, 170cm makes 5ft and 6.93 inches.

Comment requirements

Comment list should be retrieved in reverse chronological order
Comments should be retrieved along with the public IP address of the commenter and UTC date & time they were stored
Comment length should be limited to 500 characters

Feel free to ask questions before or while working on this task and remember to share with us the Github repository and live demo urls.

This is not a test. This is a chance for us to know you better and your chance to see how MAX engineers typically work.

After submitting, you might receive feedback as Github issues, might be asked to make some changes, also possibly create or review a pull request.

Although we do not want to rush you into completing this immediately, it would be best for all parties if you can submit your work within the next two days, the earlier the better.

If by the end of the two days you have not been able to address all the specs, please submit your work along with an explanation of the features you had to leave out and your reasons to deprioritize them.

May the force be with you!



