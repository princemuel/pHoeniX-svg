import { ActionError, defineAction } from "astro:actions";
import { RESEND_AUDIENCE } from "astro:env/server";
import { z } from "astro:schema";
import { resend } from "@/config/clients";
import { checkIfRateLimited } from "@/helpers/rate-limit";

export const subscribeAction = defineAction({
  accept: "form",
  input: z.object({
    honeypot: z.string().max(0, "Invalid submission detected.").optional(),
    email: z
      .string({ message: "This field is required" })
      .min(1, { message: "This field is required" })
      .email({ message: "Please enter a valid email address" }),
  }),
  handler: async (body, { request }) => {
    const { isRateLimited } = await checkIfRateLimited(request);

    if (isRateLimited)
      throw new ActionError({
        code: "TOO_MANY_REQUESTS",
        message: "You have reached your request limit",
      });

    const response = await resend.contacts.create({
      email: body.email,
      unsubscribed: false,
      audienceId: RESEND_AUDIENCE,
    });

    return response.data
      ? {
          ok: true,
          payload: `Contact #${response.data.id.slice(0, 5)} created`,
        }
      : response.error
        ? { ok: false, payload: response.error.message }
        : { ok: false, payload: "Request failed" };
  },
});
