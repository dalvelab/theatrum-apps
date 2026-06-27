module.exports = {
  async afterCreate(event) {
    try {
      const pushService = strapi.service(
        "api::push-subscription.push-subscription"
      );

      const subscriptions = await strapi.entityService.findMany(
        "api::push-subscription.push-subscription",
        {
          fields: ["subscription"],
        }
      );

      const { data } = event.params;

      const payload = {
        title: "Обновление в расписании",
        body: data.title,
        icon: "/icon-192x192.png",
        data: {
          url: "https://work.theatrum.center/",
          dateOfArrival: Date.now(),
        },
      };

      pushService.sendToAll(
        subscriptions.map((sub) => sub.subscription),
        payload
      );
    } catch (error) {
      strapi.log.error(
        "Error sending push notification for event create:",
        error
      );
    }
  },
  async beforeUpdate(event) {
    try {
      const { data } = event.params;

      if (!data.send_push) {
        return;
      }

      const pushService = strapi.service(
        "api::push-subscription.push-subscription"
      );

      const subscriptions = await strapi.entityService.findMany(
        "api::push-subscription.push-subscription",
        {
          fields: ["subscription"],
        }
      );

      const customPushBody = data.custom_push_body;

      const dateString = data.date.slice(0, 10).split("-").reverse().join("-");

      const payload = {
        title: "Расписание было изменено",
        body: customPushBody ?? `Был изменен ${data.title} - ${dateString}`,
        icon: "/icon-192x192.png",
        data: {
          url: "https://work.theatrum.center/",
          dateOfArrival: Date.now(),
        },
      };

      data.send_push = false;
      data.custom_push_body = null;

      pushService.sendToAll(
        subscriptions.map((sub) => sub.subscription),
        payload
      );
    } catch (error) {
      strapi.log.error(
        "Error sending push notification for event update:",
        error
      );
    }
  },
};
