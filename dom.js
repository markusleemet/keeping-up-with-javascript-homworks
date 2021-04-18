const hexCodes = ['#dd2525', '#21b717', '#1c367c', '#192f1b', '#9D4E3C', '#CDC14D', '#DC1AD0', '#5B3F3B', '#B6F4F6', '#56F70A'];
const wrapperDiv = document.getElementById("rectangleWrapper");

for (let hexCode of hexCodes) {
    const hexDiv = document.createElement('div');
    const hexText = document.createElement("p");
    hexText.innerText = hexCode;
    hexDiv.appendChild(hexText);
    hexDiv.id = `hexdiv${hexCodes.indexOf(hexCode)}`;
    hexDiv.classList.add("child-div");
    hexDiv.style.height = `${Math.random() * 200 + 100}px`;
    hexDiv.style.width = `${Math.random() * 200 + 100}px`;
    hexDiv.style.backgroundColor = hexCode;
    wrapperDiv.appendChild(hexDiv);
}


console.log("Here are the rectangle IDs:");
const allRectangles = document.querySelectorAll(".child-div");
for (let rectangle of allRectangles) {
    console.log(rectangle.id);
}
