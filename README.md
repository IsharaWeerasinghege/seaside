# seaside

<h2>how to run this project localy</h2>

1.Clone the repository to your local machine using the git clone command.

2.Install the required dependencies for both the client and server applications. You can do this by navigating to the server directory of the project in your terminal and running the following command:
<pre>
<code>
cd server
npm install
</code>
</pre>

3.In a separate terminal window, navigate to the client directory within the project and run the following command to install client dependencies:

<pre>
<code> 
cd client 
npm install
</code>
</pre>

4.Create a .env file in the server directory of the project and add the following variables:

<pre>
<code>
MONGODB_URI="your_mongodb_uri"
JWT_SECRET="your_jwt_secret"
</code>
</pre>

5.Replace <your_mongodb_uri> with your MongoDB connection string, and <your_jwt_secret> with a secret string that will be used to sign and verify JSON Web Tokens.

6.Start the server by running the following command in the server directory of the project:

<pre><code>
npm run start
</code></pre>

7.In a separate terminal window, navigate to the client directory within the project and run the following command to start the client application:

<pre>
<code>
cd client
npm start
</code>
</pre>

8.Seaside project should now be running locally. You can view it by navigating to http://localhost:3000 in your web browser.

<h2>How to import users to mongoDb</h2>

1.create a collection users.

2.click add data button.

3.select import JSON or CSV file.

4.select users.json file in data folder.

5.then import button.


<h2>Demo user data and password</h2>
<ul>
<li>crewmanager@gmail.com : 123456789v </li>
<li>reservation@gmail.com : 123456789v </li>
<li>fleetmanager@gmail.com : 123456789v </li>
<li>adminfeedback@gmail.com : 123456789v </li>
<li>suppliermanager@gmail.com : 123456789v </li>
<li>supplierone@gmail.com : 123456789v </li>
<li>supplierTwo@gmail.com : 123456789v </li>
<li>partymanager@gmail.com : 123456789v </li>
<li>inventorymanager@gmail.com : 123456789v </li>
<ul>
