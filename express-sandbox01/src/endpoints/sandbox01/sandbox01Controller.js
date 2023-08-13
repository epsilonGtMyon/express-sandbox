function index(req, res) {
  if (req.session.users == undefined) {
    const records = [
      {
        id: "1",
        name: "田中 太郎",
      },
      {
        id: "2",
        name: "山本 二郎",
      },
    ];
    req.session.users = {
      records,
      currentId: Math.max(...records.map((x) => x.id)),
    };
  }

  res.render("sandbox01/index", { title: "sandbox01" });
}

function findUsers(req, res) {
  const users = req.session.users.records;
  res.send({
    users,
  });
}

async function register(req, res) {
  const body = req.body;

  const users = req.session.users;
  const nextId = users.currentId + 1;

  const newUser = {
    id: nextId,
    name: body.name,
  };

  users.records.push(newUser);
  users.currentId = nextId;

  res.status(204).send();
}

export { index, findUsers, register };
