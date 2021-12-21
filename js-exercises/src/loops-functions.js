function generatePattern(num) {
  for (let i = 0; i < num; i++) {
    let star = "";
    for (let j = i; j < num; j++) {
      star += "*";
    }
    console.log(star);
  }
}
generatePattern(5);