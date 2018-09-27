export const navItems = [
  {
    name: 'IRMA',
    url: '/irma',
    icon: 'fa-qrcode'
  },
  {
    name: 'Processes',
    url: '/processes',
    icon: 'cui-cog'
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
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
        name: 'Inwoner',
        url: '/stadspas/stadspas-burger',
        icon: 'icon-user'
      },
      {
        name: 'Batch',
        url: '/stadspas/stadspassen',
        icon: 'icon-layers'
      }
    ]
  }
  /*,  {
    name: 'Download CoreUI',
    url: 'http://coreui.io/angular/',
    icon: 'icon-cloud-download',
    class: 'mt-auto',
    variant: 'success'
  }*/
  /*,
  {
    name: 'Try CoreUI PRO',
    url: 'http://coreui.io/pro/angular/',
    icon: 'icon-layers',
    variant: 'danger'
  }*/
];
