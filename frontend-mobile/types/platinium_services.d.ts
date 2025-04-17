declare module "platinium_services" {
  export function login(
    username: string,
    password: string
  ): Promise<{ token: string }>;
  export function loginDab(
    numbers: string,
    pin: string
  ): Promise<{ token: string }>;
}
