# Virtual-Hoover
A program that navigates an imaginary robotic hoover, returning final position and spots of dirt cleaned in the browser console.

## How to run this program
1. Clone the repo and open the index.html file locally in any modern browser.
2. Use the "Choose File" button to select an input file (must follow format outlined below).
3. Open the browser console to view program output, including final position and number of dirt spots cleaned. 

## Input file format

Example:
```
5 5
1 2
1 0
2 2
2 3
NNESEESWNWW
```
- the first line holds the room dimensions (X Y), separated by a single space (all coordinates will be presented in this format)
- the second line holds the hoover position
- subsequent lines contain the zero or more positions of patches of dirt (one per line)
- the next line then always contains the driving instructions (at least one)
