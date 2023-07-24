function index(req, res) {
  // res.send({
  //   value: "sandbox01"
  // })

  res.render("sandbox01/index", { title: "sandbox01" });
}

function findUsers(req, res) {

  res.send({
    users: [
      {
        id: "1",
        name: "田中 太郎"
      },
      {
        id: "2",
        name: "山本 二郎"
      }
    ]
  })
}

export { index, findUsers };
