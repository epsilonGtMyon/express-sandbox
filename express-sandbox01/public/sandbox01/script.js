import {
  createApp,
  onMounted,
  ref,
} from "https://unpkg.com/vue@3.3.4/dist/vue.esm-browser.js";

createApp({
  setup() {
    const urlPrefix = "/sandbox01";
    const name = ref("");
    const users = ref([]);
    const errors = ref({});

    onMounted(async () => {
      await load();
    });

    async function load() {
      const findUsersResponse = await fetch(`${urlPrefix}/findUsers`);
      const findUsersResponseBody = await findUsersResponse.json();
      users.value = findUsersResponseBody.users;
    }

    async function register() {
      errors.value = {};

      const r = await fetch(`${urlPrefix}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.value,
        }),
      });

      if (r.ok) {
        name.value = "";
        await load();
      } else {
        if (r.status === 400) {
          errors.value = (await r.json()).errors.reduce(
            (er, { path, message }) => {
              // これだと複数メッセージに対応できていないがまぁいいや
              er[path] = message;
              return er;
            },
            {}
          );
        }
      }
    }

    return {
      name,
      users,
      errors,
      register,
    };
  },
}).mount("#app");
