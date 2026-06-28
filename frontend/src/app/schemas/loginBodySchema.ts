import z from "zod";

export const loginBodySchema = z.object({
  identifier: '',
  senha: '',
});