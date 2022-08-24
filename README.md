TO DO LIST

- Add stopwatch when game starts
- timer resets on restart, win and lose menus
- timer stops and starts when paused/unpaused

- turn all key checks into a big switch case if possible, may be a bit of a pain to refactor
https://www.gamedev.net/reference/articles/article735.asp // good resource for collision detection
- sort collisions with blocks and paddle, as the ball is clipping on the corner of paddle and sides of the blocks
- make ball start movement random instead of set path
- centre the grid, title, and menus
- speed up paddle?
- flesh out the scoring system?
    - higher up bricks worth more points
    - combo bonus for more then one brick removed on a single trip

- sound effects when the ball hits something, or when the bricks are removed

Dev Tool/Performance tasks
- no frame drops, FPS must stay at same number
- FPS 50 - 60
- run Dev Tool rendering the paint ON, paint must be used very little
- run Dev Tool rendering the layer ON, layers must be used very little
- Is layer creation being promoted properly? https://web.dev/stick-to-compositor-only-properties-and-manage-layer-count/
- https://murtada.nl/blog/going-jank-free-achieving-60-fps-smooth-websites

AUDIT: https://learn.01founders.co/git/root/public/src/branch/master/subjects/make-your-game/audit
