/**
 * @description: 解析歌词文件
 * @param {*} data
 * @return {*}
 */
function parseLrc(data) {
  return data
    .split("\n")
    .map((str) => {
      var res = str.match(/^\[(?<time>.*)\](?<lrc>.*)?$/);
      return res ? { time: res.groups.time, lrc: res.groups.lrc || "" } : undefined;
    })
    .filter(Boolean);
}

/**
 * @description: 处理时间格式
 * @return {*} parseTime("02:49.23") => 169.23
 */
function parseTime(timeStr) {
  var arr = timeStr.split(":").map((_str) => parseFloat(_str));
  return +(arr[0] * 60 + arr[1]).toFixed(2);
}

function setActive(el) {
  if (!el || el.tagName.toLocaleLowerCase() != "li") return;
  var halfHeight = main.offsetHeight / 2;
  var offsetHeight = el.offsetTop;
  // lrcWrap.style.transform = `translateY(${-offsetHeight}px)`;
  lrcWrap.scroll({ top: offsetHeight - halfHeight });
  liList.forEach((li) => li.el.classList.remove("active"));
  el.classList.add("active");
  currentActiveEl = el;
}

/**
 * @description: 创建每行歌词
 * @param {*} data 处理好的歌词数据
 * @return {*} [{el, time }]
 */
function createElement(data) {
  return data.map((row) => {
    const li = document.createElement("li");
    const time = parseTime(row.time);
    li.innerText = row.lrc;
    li.dataset.time = time;
    return { el: li, time };
  });
}

/**
 * @description: 生成歌词
 * @param {*} data
 * @return {*}
 */
function appendLrc(data) {
  const fragment = document.createDocumentFragment();
  data.forEach((item) => fragment.appendChild(item.el));
  lrcWrap.appendChild(fragment);
}

/** @type {HTMLDivElement} */
const lrcWrap = document.querySelector(".lrc-wrap");
var liList = createElement(parseLrc(lrc));

/** @type {HTMLAudioElement} */
var audio = document.querySelector("audio");
var main = document.querySelector("main");
var currentActiveEl = null;

// 给歌词注册监听事件
lrcWrap.addEventListener("click", (e) => {
  setActive(e.target);
  const time = e.target.dataset.time;
  if (!time) return;
  // 设置播放位置
  audio.currentTime = +time;
  // 开始播放
  if (audio.paused) audio.play();
});

// 给播放器注册监听事件
audio.addEventListener("loadedmetadata", () => {
  console.log("loadedmetadata");
});
audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;
  const el = findLrcEl(liList, currentTime);
  if (el && currentActiveEl != el) setActive(el);
});

/**
 * @description: 查找对应歌词li
 * @param {*} liList
 * @param {*} currentTime
 * @return {*} el
 */
function findLrcEl(liList, currentTime) {
  let idx = liList.findIndex((li) => li.time > currentTime);
  if (idx) {
    return liList[idx - 1].el;
  }
}

appendLrc(liList);
