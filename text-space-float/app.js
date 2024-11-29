const DATA = {
  data: [
    "JavaScript, ",
    "TypeScript, ",
    "ReactJs, ",
    "Angular, ",
    "AngularJS, ",
    "D3.js, ",
    "ChartJs, ",
    "Bootstrap, ",
    "Tailwind CSS, ",
    "HTML, ",
    "ISML, ",
    "Git, ",
    "LeafletJS, ",
    "JQuery, ",
    "Java, ",
    "Spring Framework, ",
    "Spring Boot, ",
    "SFCC, ",
    "Karma, ",
    "Jasmine, ",
    "SCSS, ",
    "LESS, ",
    "CSS, ",
    "Handlebar Js, ",
    "Firebase, ",
  ],
  "start-transition-time": "50000",
  "stop-transition-time": "1000",
  transition: "ease-out",
  "container-selector": ".section-text-container",
  classesArray: [],
  colorsArray: [],
  minSize: "20",
  maxSize: "20",
  rotation: false,
};

let textValuesContainer;
let counter = 0;
let initialSpaceOfLetter = [];
let interval;

function createListOnLoad(data = DATA.data) {
  const PARENT_ELEMENT = querySelector(DATA["container-selector"]);
  PARENT_ELEMENT.style.overflow = "hidden";
  data.map((element) => createDataWordElements(element));
  textValuesContainer = Array.from(querySelectorAll(".floating-text-value"));
}

function createDataWordElements(word) {
  const PARENT_ELEMENT = querySelector(DATA["container-selector"]);
  // for (var i = 0; i < word.length; i++) {
  const span = document.createElement("span");
  span.style.transition =
    DATA["start-transition-time"] + "ms " + DATA.transition;
  // span.innerText = word.charAt(i);
  span.innerHTML = word.replaceAll(" ", "&nbsp");
  span.className = DATA.classesArray.concat("floating-text-value").join(" ");
  span.style.position = "relative";
  span.style.top = 0;
  span.style.left = 0;
  span.style.fontSize =
    "" +
    getRandomNumberInRange(Number(DATA.minSize), Number(DATA.maxSize)) +
    "px";
  span.style.color =
    DATA.colorsArray[getRandomNumberInRange(0, DATA.colorsArray.length - 1)];
  span.style.height = "min-content";
  PARENT_ELEMENT.appendChild(span);
  // }
}

function startTextAnimation() {
  counter = counter + 1;
  textValuesContainer.map((element, index) =>
    moveTextRandomPosition(element, index)
  );
}

function stopTextAnimation() {
  clearInterval(interval);
  textValuesContainer.map((element) => moveTextOriginalPosition(element));
}

function moveTextRandomPosition(element, index) {
  const [ELEMENT_Y, ELEMENT_X] = getRandomPositionForElement(element, index);

  const rotate =
    (getRandomNumberInRange() > 0.5 ? 1 : -1) * getRandomNumberInRange(0, 360);

  DATA.rotate ? (element.style.transform = `rotate(${rotate}deg)`) : "";
  element.style.transition =
    DATA["start-transition-time"] + "ms " + DATA.transition;
  element.style.top = ELEMENT_Y + "px";
  element.style.left = ELEMENT_X + "px";
}

function moveTextOriginalPosition(element) {
  element.style.transition =
    DATA["stop-transition-time"] + "ms " + DATA.transition;
  element.style.top = 0;
  element.style.left = 0;
  element.style.transform = "rotate(0deg)";
  element.style.position = "relative";
}

function querySelector(selector) {
  return document.querySelector(selector);
}

function querySelectorAll(selector) {
  return document.querySelectorAll(selector);
}

function getRandomPositionForElement(element, index) {
  if (counter === 1) {
    const PARENT_ELEMENT = querySelector(DATA["container-selector"]);
    const positionObj = {
      top: -Math.abs(element.offsetTop - element.offsetHeight),
      right:
        PARENT_ELEMENT.offsetWidth - element.offsetLeft - element.offsetWidth,
      bottom:
        PARENT_ELEMENT.offsetHeight - element.offsetTop - element.offsetHeight,
      left: -Math.abs(element.offsetLeft - element.offsetWidth),
    };
    initialSpaceOfLetter.push(positionObj);
  }

  const X_SPACE = getRandomNumberInRange(
    initialSpaceOfLetter[index].left,
    initialSpaceOfLetter[index].right
  );

  const Y_SPACE = getRandomNumberInRange(
    initialSpaceOfLetter[index].top,
    initialSpaceOfLetter[index].bottom
  );

  return [Y_SPACE, X_SPACE];
}

function startUntilStop() {
  startTextAnimation();
  interval = setInterval(() => {
    startTextAnimation();
  }, DATA["start-transition-time"] * 0.9);
}

function getRandomNumberInRange(startLimit = 0, endLimit = 0) {
  // Math.floor(Math.random() * (n - m + 1)) + m;
  return Math.floor(Math.random() * (endLimit - startLimit + 1)) + startLimit;
}

/* 
    TODO: 
    5. convert js into ts
    6. convert into package
*/
