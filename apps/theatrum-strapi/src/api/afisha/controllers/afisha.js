'use strict';

/**
 * afisha controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::afisha.afisha', ({ strapi }) => ({
  async find(ctx) {
    try {
      const afishas = await super.find(ctx);

      if (!afishas) {
        return ctx.notFound(`[CONTROLLER:AFISHA - METHOD:FIND]: NOT FOUND`, `NOT FOUND DATA FOR ${ctx.request.url}`);
      }

      const { data, meta } = afishas;

      if (!data || data?.length === 0) {
        return { data, meta };
      }

      const sortedData = data.map((afisha) => {
        if (!afisha.attributes.tickets || afisha.attributes.tickets.length < 2) {
          return afisha;
        }

        const sortTickets = afisha.attributes.tickets.sort((a, b) => new Date(a.date) - new Date(b.date))

        afisha.attributes.tickets = sortTickets;

        return afisha;
      })
        .sort((a, b) => {
          if (!a.attributes.tickets) {
            return;
          }

          return new Date(a.attributes.tickets[0].date) - new Date(b.attributes.tickets[0].date)
        });

      return { data: sortedData, meta };
    } catch (error) {
      throw new Error(`[CONTROLLER:AFISHA - METHOD:FIND]: ${error}`);
    }
  },
  async findOne(ctx) {
    try {
      const afisha = await super.findOne(ctx);

      if (!afisha) {
        return ctx.notFound(`[CONTROLLER:AFISHA - METHOD:FIND_ONE]: NOT FOUND`, `NOT FOUND DATA FOR ${ctx.request.url}`);
      }

      const { data, meta } = afisha;

      if (!data || !data.attributes.tickets || data.attributes.tickets.length < 2) {
        return { data, meta };
      }

      const sortedTickets = data.attributes.tickets.sort((a, b) => new Date(a.date) - new Date(b.date));

      data.attributes.tickets = sortedTickets;

      return { data, meta };
    } catch (error) {
      throw new Error(`[CONTROLLER:AFISHA - METHOD:FIND_ONE]: ${error}`);
    }
  }
}));
