TO DO LIST

- centre the grid, title, and menus
- speed up paddle when the key is initally pressed

Extras:
- turn all key checks and if statements into a big switch case if possible, may be a bit of a pain to refactor
- make ball start movement random instead of set path

Dev Tool/Performance tasks
- no frame drops, FPS must stay at same number
- FPS 50 - 60
- run Dev Tool rendering the paint ON, paint must be used very little
- run Dev Tool rendering the layer ON, layers must be used very little
- Is layer creation being promoted properly? https://web.dev/stick-to-compositor-only-properties-and-manage-layer-count/

https://murtada.nl/blog/going-jank-free-achieving-60-fps-smooth-websites
https://www.gamedev.net/reference/articles/article735.asp 

AUDIT: https://learn.01founders.co/git/root/public/src/branch/master/subjects/make-your-game/audit

Performance notes:
- A frame rate that is as high as possible for smoothness
- A frame rate that isn't higher than the screen refresh rate
- A frame rate that doesn't use too much system resources

https://stackoverflow.com/questions/18364175/best-practices-for-reducing-garbage-collector-activity-in-javascript