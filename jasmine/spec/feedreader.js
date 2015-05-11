/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('each are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Steps 8 & 9
         * Test that loops through each feed
         * in the allFeeds object and ensures it has a URL and Name defined
         * and that the URL and Name are not empty.
         */
        it('each have a URL defined', function() {
            for (var i in allFeeds) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).toBeTruthy();
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).toBeTruthy();
            }
        });
    });


    /* Steps 10 - 12
     * This test suite will check the Menu functionality/Visibility
     */
     
    describe('The Menu', function() {
        var body = $('body');
        
        /* Step 10
         * Test that ensures the menu element is hidden by default
         * Menu element is defined by the class "menu-hidden" for the body element
         */
         it('is hidden by default', function() {
               expect(body.hasClass('menu-hidden')).toBeTruthy();
         });

         /* Step 11
          * Nested Describe Block - Test the ensures clicking the menu icon properly toggles
          * the menu element. First test ensures it is shown, 
          * Second click ensures menu is hidden again
          */
          
          describe('the Menu Icon is clicked', function() {
              
              //Click the menu icon before each test
              beforeEach(function() {
                  $('.menu-icon-link').click();
              });
              
              //Step 12: next two tests
              
              //Test that the menu element is appearing after the first click
              it('1st time and it is visible to the user', function() {
                expect(body.hasClass('menu-hidden')).toBeFalsy();
              });
              
              //Test that the menu element is hidden after the second click
              it('2nd time and the menu is invisible to the user', function() {
                expect(body.hasClass('menu-hidden')).toBeTruthy();
              });
          });
      });

    /* Steps 13 - 14
     * This test suite will test the initial entries on out page
     * loadFeed() is asynchronous
     */
     
        describe('Initial Entries', function() {
            
            //Need to call loadFeed() for the initial entries
            beforeEach(function(done) {
                loadFeed(0, done);
            });
            
            //Step 14: Test to ensure there is at least a single .entry element within the feed container
            it ('at least 1 feed loaded', function(done) {
                console.log("Feeds loaded: " + $('.feed').children().length);
                expect($('.feed').children().length).toBeGreaterThan(0);
                done();
            });
        });

    /* Steps 15 - 16
     * This test suite will ensure a new feed is loaded by the loadFeed() function
     * Note: loadFeed() is asynchronous
     */

        describe('New Feed Selection', function() {
            //Variable to store the text of the feed
            var feedText;
            
            beforeEach(function(done) {
                //Save the title of the initial feed, look for the h2 element
                feedText = $('.feed').find('h2').text();
                //Load the next feed
                loadFeed(1, done);
            });
            
            //Step 16: Test to ensure a new feed is loaded by the loadFeed() function
            it('has been loaded', function(done) {
                //Compare the original title to the new title
                expect($('.feed').find('h2').text()).not.toBe(feedText);
                done();
            });
        });
}());