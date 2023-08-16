// 動作検証用なのでパスワードは平文

const users = [
  {
    userId: "001",
    password: "P001",
    name: "太郎",
  },
  {
    userId: "002",
    password: "P002",
    name: "次郎",
  },
];

function findUser(userId) {
  const user = users.find((u) => u.userId === userId);
  if (user == undefined) {
    return null;
  }

  return Object.freeze({ ...user });
}

module.exports.findUser = findUser;
