# GoT bio SPA 

Simple single page app project for LTX

### Running it
To run `npm i` then `npm start` 

This should be all that is required to run this, but let me know if any errors are encountered. I had a strange one that I haven't seen in my usual node development when I was first sketching this out, but I think I've restructed it in a way that the error shouldn't happen (memory ran out for the test server, seemingly due to putting the .csv into /public, which is strange as it's a pretty small file)

###Dependencies added:

ag-grid - library for creating grid layout, used for the character select scroller

csv - csv parser


### NOTES: 
All the app logic is contained in the Bio.js file. I'm thinking of breaking it up a little bit, but it isn't particularly long as it stands. I've gone with a frontend logic only approach, I considered using express to serve up the .csv but decided against it.

Goals I'd like to clarify my approach to/how I'd approach them later:

"on empty results, display an appropriate error message" : I took this as empty fields within a given row, and I figured we didn't want an error so much as a "this field is blank" message, so that's what I went with. (I've seen a few Sean Bean movies outside of his GoT appearances but I couldn't come up with any good jokes :C)

"Enable the user the ability to show all entries in no particular order" : I thought this could mean rearrangement, initial load-in order (i.e. whatever is served up from the .csv) or just being able to clear the filers (though an extra credit goal implies thats not the case). Either way I went with just being able to clear filters here, which at least fits with the "intial load-in order" interpretation.

"Enable random order of entries when initially loaded" : Technically this could mean a button on the page that refreshes and shuffles on that specific refresh, but I just went with shuffling the entires on all page refreshes

"Incorporate deferred loading to scroll more to replace the ability to show all" : unfortunately I'm not quite sure what is meant by "scrolling more" and the "ability to show all" offhand, as I didn't have any issue with scrolling in this particular dataset after its loaded in (and it doesn't appear at all until it's loaded in), but I take this to mean that I should add an implementation of lazy-loading for the scrolling view as a further improvement, which I plan on looking into if I have time tomorrow. 

"Enable the user to display an area that has a pie chart of the proportional genders of the entries" : This one doesn't seem too bad, but I was mostly focused on making the core functionality clean today, I'll try and implement it tomorrow using a graph library for node, it'd just be a hidden extra view as another child of the overall biography container that shows a breakdown of gender when a button is clicked. Feeding the information into it would be easiest early on after the initial rendering is done, and its really just a quick tally of the list for isMale. 


#### Other stuff:

It'd be nice to tweak some of the .css since there are certain bits that shift around erratically and thats bothersome (buttons and the bio text causes the divs to move)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
