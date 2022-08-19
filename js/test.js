// if (ballCurrentPosition[0] > userCurrentPosition[0]) {
//     testX = userCurrentPosition[0];      // test left edge
// } else if (ballCurrentPosition[0] < userCurrentPosition[0] + blockWidth) {
//     testX = userCurrentPosition[0] + blockWidth;   // right edge
// }
// if (ballCurrentPosition[1] > userCurrentPosition[1]) {
//     testY = userCurrentPosition[1];      // top edge
// } else if (ballCurrentPosition[1] < userCurrentPosition[1] + blockHeight) {
//     testY = userCurrentPosition[1] + blockHeight;   // bottom edge
// }

// // get distance from closest edges
// let distX = ballCurrentPosition[0] - testX;
// let distY = ballCurrentPosition[1] - testY;
// let distance = Math.sqrt((distX * distX) + (distY * distY));
// // console.log(distance, ballRadius)
// if (distance > ballRadius) {
//     changeDirection()
// }