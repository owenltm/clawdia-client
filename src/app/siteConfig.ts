export const siteConfig = {
  name: "Dashboard",
  url: "https://dashboard.tremor.so",
  description: "The only dashboard you will ever need.",
  baseLinks: {
    home: "/",
    overview: "/overview",
    crab: "/crab",
    box: "/box",
    finance: "/finance",
    settings: {
      general: "/settings/general",
      users: "/settings/users",
    },
  },
}

export type siteConfig = typeof siteConfig
