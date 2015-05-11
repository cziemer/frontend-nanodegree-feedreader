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


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL
         * and that the URL is not empty.
         */
        it('each have a URL defined and not blank', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                //use toBeTruthy beacuse that will ensure the field is not blank
                expect(allFeeds[i].url).toBeTruthy;
            }
        });
        
        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a Name defined
         * and that the Name is not empty.
         */
        it('each have a Name defined and not blank', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                //use toBeTruthy beacuse that will ensure the field is not blank
                expect(allFeeds[i].name).toBeTruthy();
            }
        });
    });


    /* This test suite will check the Menu functionality and Visibility */

    describe('The Menu', function() {
        var body = $('body');
        
        /* Test that ensures the menu element is hidden by default
         * Menu element is defined by the class "menu-hidden" for the body element
         */
         it('is hidden by default', function() {
               expect(body.hasClass('menu-hidden')).toBeTruthy();
         });

         /* Nested Describe Block - Test the ensures clicking the menu icon properly toggles
          * the menu element. First test ensures it is shown, 
          * Second click ensures menu is hidden again
          */
          
          describe('the Menu Icon', function() {
              
              //Click the menu icon before each test
              beforeEach(function() {
                  $('.menu-icon-link').click();
              });
              
              //Test that the menu element is appearing after the first click
              it('toggles visibility when the icon is clicked', function() {
                expect(body.hasClass('menu-hidden')).toBe(false);
              });
              
              //Test that the menu element is hidden after the second click
              it('toggles visibility when the icon is clicked again', function() {
                expect(body.hasClass('menu-hidden')).toBe(true);
              });
          });
      });

    /* This test suite will test the initial entries on our page
     * loadFeed() is asynchronous
     */
     
        describe('Initial Entries', function() {
            
            //Need to call loadFeed() for the initial entries
            beforeEach(function(done) {
                loadFeed(0, done);
            });
            
            //Test to ensure there is at least a single .entry element within the feed container
            it ('at least 1 feed loaded', function() {
                expect($('.feed').children().length).toBeGreaterThan(0);
            });
        });

    /* This test suite will ensure a new feed is loaded by the loadFeed() function
     * Note: loadFeed() is asynchronous
     */
     
        describe('New Feed Selection', function() {
            var feedContents = "";
            
            beforeEach(function() {
                //Cleat the entire feed each time
                $('.feed').empty();
            });
            
            //Test to ensure a new feed is loaded by the loadFeed() function
            it('has been loaded', function(done) {
                //Load all feeda and check the HTML
                for (var i = 0; i < allFeeds.length; i++) {
                    loadFeed(i, function(){
                        //Compare the original HTML to the new HTML
                        expect($('.feed').html()).not.toBe(feedContents);
                        feedContents = $('.feed').html();
                        done();
                    });
                }
            });
        });
}());