Meatpocalypse
=============

Before attemping to run the game at all, make sure you have Node v5.8.0 installed.

To run first all dependencies must be installed:

``` $ sudo npm install ```

will install all dependencies.


Then you can:

``` $ grunt ```

to create meatpocalypse.min.js.

``` $ node src/app.js ```

Then in your browser:

``` http://localhost:3000 ```

Before committing, make sure all tests pass by running:

``` $ jasmine ```

Every time you make a change to a .js file in src/client/game, you must re-run grunt in the root
project directory to be able to see your changes in the browser.
