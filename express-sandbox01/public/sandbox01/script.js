(async function () {
  class Sandbox01Service {
    async findUsers() {
      const findUsersResponse = await fetch("/sandbox01/findUsers");
      const findUsersResponseBody = await findUsersResponse.json();
      const users = findUsersResponseBody.users;
      return users;
    }
  }

  const userTableElem = document.getElementById("userTable");
  const userTableTbody = userTableElem.querySelector("tbody");

  const sandbox01Service = new Sandbox01Service();

  const users = await sandbox01Service.findUsers();

  // アクセス

  for (const user of users) {
    const tr = document.createElement("tr");
    const idTd = document.createElement("td");
    const nameTd = document.createElement("td");

    idTd.textContent = user.id;
    nameTd.textContent = user.name;

    tr.append(idTd);
    tr.append(nameTd);

    userTableTbody.append(tr);
  }
})();
