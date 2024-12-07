export type NavbarLink = {
  title: string;
  path: string;
};
export const navbarLinks: [NavbarLink] = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Login", path: "/login" },
  { title: "Register", path: "/register" },
  { title: "Telescope Map", path: "/map" }
];
