declare module "platinium_services" {
  export function login(
    username: string,
    password: string
  ): Promise<{ token: string }>;
  export function loginDad(
    numbers: string,
    pin: string
  ): Promise<{ token: string }>;
}
