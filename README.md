N-Queens
==============

This is a project I completed as a student at Hack Reactor. This project was worked on with a pair. The project attempted to solve the n-queens problem of placing n queens on an n×n chessboard, where solutions exist for all natural numbers n with the exception of n=2 and n=3.:

## Structure:

The repository consists of 

- backbone app
- test Specs files.

### BoardViewer - backbone

The boardviewer is a backbone app allowing one to visualize an nxn chessboard and interact with it. The chessboard will detect invalid boards by highlighting the rows, columns and/or diagonals (major or minors) with conlficts.

to run it, simply open `BoardViewer.html` with your browser

### SpecRunner - mocha

The specrunner contain both the tests for the BoardViewer, and in particular for the

- Empty board
- Board with row conflicts
- Board with column conflicts
- Board with major diagonal conflicts
- Board with minor diagonal conflicts

as well as test for the solvers:

- Finds a valid n-queens solution for n of 0-7
- Finds the number of valid n-queens solutions for n of 0-8


### Testing

Tests are made with the [Mocha](https://github.com/mochajs/mocha) testing framework.
Test are located in the ./spec directory. To run open the spec runner file with chrome.

```
SpecRunner.html
```
