<template>
  <div
    class="flex flex-col justify-between items-start w-full p-2 gap-2 h-[calc(100%_-_120px)]"
  >
    <div class="w-full">
      <h2 class="px-2 font-bold my-2">Notificações</h2>
      <ul
        class="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <li
          @click="action(notification)"
          v-for="notification in notifications"
          :key="notification.key"
          class="w-full flex flex-col hover:bg-cyan-100 focus:bg-cyan-100 cursor-pointer justify-between items-start px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600"
        >
          <div class="text-xs flex gap-2 items-center">
            <p class="flex justify-start items-center gap-2">
              <span
                class="material-icons-outlined text-cyan-600"
                style="font-size: 12px !important"
                >calendar_month</span
              >
              <span class="text-[12px]">{{ notification.date }}</span>
            </p>
            <p class="flex justify-start items-center gap-2">
              <span
                class="material-icons-outlined text-cyan-600"
                style="font-size: 12px !important"
                >schedule</span
              >
              <span class="text-[12px]">{{ notification.time }}</span>
            </p>
          </div>
          <div class="my-2 flex flex-col justify-between items-start gap-1">
            <p class="uppercase font-bold text-cyan-600 text-xs">
              {{ notification.title }}
            </p>
            <p class="text-lg">{{ notification.body }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div
      class="w-full h-10 px-4 text-white bg-cyan-600 hover:bg-cyan-900 rounded shadow-md flex justify-start items-center gap-2"
      @click="store.logout"
    >
      <span class="material-icons-sharp">logout</span> sair
    </div>
  </div>
</template>

<script>
import { useApi } from "@/store/index.js";
import { useNotify } from "@/composables/useNotify";
export default {
  data() {
    const notify = useNotify();
    const store = useApi();
    return {
      store,
      notify,
    };
  },
  computed: {
    notifications() {
      console.log(this.store.notifications);
      return this.store.notifications.filter((not) => !not.opened);
    },
  },
  methods: {
    async action(notification) {
      console.log(notification.command.type);
      switch (notification.command.type) {
        case "readonly":
          this.notify.positive("Mensagem lida")
          this.store.updateData(
                "notifications",
                this.store.userId +
                  "/"+notification.key,
                "opened",
                true
              );
        break;
        case "add_user":
          const user = await this.store.getDataBy(
            "users",
            notification.command.data
          );
          if (!user.err) {
            const not = await this.notify.confirmCancel(
              "Deseja adicionar " + user.username + " à sua lista de players?"
            );

            if (not) {
              this.store.updateData(
                "users",
                this.store.userId,
                "players/" + notification.command.data,
                user
              );
               this.store.updateData(
                "users",
               notification.command.data ,
                "players/" +this.store.userId   ,
                this.store.user
              );
              this.store.updateData(
                "notifications",
                this.store.userId +
                  "/"+notification.key,
                "opened",
                true
              );
              const res = this.store.sendMessage({
                title: "Convite aceito",
                body:" O usuário "+this.store.username+" aceitou seu convite, e agora faz parte da sua lista de players",
                command:{
                   type:"readonly"
                }
              }, notification.command.data);

              if (res) {
               this.notify.positiveConfirm(
                  "O usuário " +
                   user.username +
                  ", foi adicionado à sua lista de players"
               );
             }
              this.store.listenNotifications();
            }
          }
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
