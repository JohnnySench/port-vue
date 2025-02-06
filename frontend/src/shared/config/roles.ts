export const ROLES = {
  GUEST: 1,
  ADMIN: 2,
  SUPER_ADMIN: 3,
}

export const ROLES_RIGHTS_ROUTES = {
  1: {
    main: ["all"],
    editor: ["write", "read"],
    dashboard: ["closed"],
    component: ["closed"],
    users: ["closed"],
  },
  2: {
    main: ["all"],
    editor: ["write", "read"],
    dashboard: ["closed"],
    component: ["closed"],
    users: ["closed"],
  },
  3: {
    main: ["all"],
    editor: ["all"],
    dashboard: ["all"],
    component: ["all"],
    users: ["all"],
  },
}
