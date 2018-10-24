# peaks-and-valleys
node.js to determine peaks and valleys in an array of numbers

We only want to build castles in two types of places:
a. Peaks
b. Valleys

Let’s say you have an array of integers that describes a stretch of land, where each integer represents the
current height of the land. Write a function that reads that array and returns the number of
castles to build on that stretch of land.

The following assumptions are made:
- You can always build a castle at the start of the array, provided it is non-empty
- We only want to build one castle per peak or valley.
- A peak is an integer or series of integers that is above the immediately preceding and following
ints. For example, in the sequence [2,6,6,6,3] the sequence of 3 6s is a peak.
- A valley is an integer or series of integers that is below the immediately preceding and
following ints. For example, in the sequence [6,1,4] the "1" would be a valley.

*****************************************

run the example from a console window:

assignment\peakVally> node castle.js

