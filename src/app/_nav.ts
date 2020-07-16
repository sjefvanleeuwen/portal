export const navItemsProf = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    name: 'Stadspassen',
    url: '/stadspas',
    icon: 'icon-credit-card',
    children: [
      {
        name: 'Professional',
        url: '/stadspas/stadspas-prof',
        icon: 'icon-user'
      },
      {
        name: 'Batch',
        url: '/stadspas/stadspassen',
        icon: 'icon-layers'
      }
    ]
  }
];

export const navItemsInwoner = [
  {
    name: 'Stadspassen',
    url: '/stadspas',
    icon: 'icon-credit-card',
    children: [
      {
        name: 'Inwoner',
        url: '/stadspas/stadspas-burger',
        icon: 'icon-user'
      },
    ]
  }
];
