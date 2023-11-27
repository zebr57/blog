let user = {
  name: "王花花",
  gender: "男",
  age: "20",
};

function showName() {
  const doc = document.querySelector(".name");
  doc.textContent = `姓名： ${user.name}`;
}

function showGender() {
  const doc = document.querySelector(".gender");
  doc.textContent = `性别： ${user.gender}`;
}

function showAge() {
  const doc = document.querySelector(".age");
  doc.textContent = `年龄： ${user.age}`;
}

observe(user);

autoRun(showName)
autoRun(showGender)
autoRun(showAge)


