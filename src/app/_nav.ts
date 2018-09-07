export const navItems = [
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
        name: 'Persoonlijk',
        url: '/stadspas/stadspas',
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
