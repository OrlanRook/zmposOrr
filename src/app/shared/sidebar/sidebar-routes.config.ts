import { RouteInfo } from './sidebar.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [

  {
    path: '/admin', title: 'Dashboard', icon: 'bx bx-home-circle', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '', title: 'Reportes', icon: 'lni lni-bar-chart', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
      { path: '/admin/reports/general',  title: 'Reportes Generales', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      // { path: '/admin/reports/return',   title: 'Devoluciones',       icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      // { path: '/admin/reports/warranty', title: 'Garantías',          icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
  {
    path: '', title: 'Finanzas', icon: 'lni lni-money-location', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
      { path: '/admin/finance/payable',     title: 'Cuentas x Pagar',   icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/admin/finance/receivable',  title: 'Cuentas x Cobrar',  icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
  {
    path: '', title: 'Caja', icon: 'lni lni-dropbox', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
      { path: '/admin/drawers/assignment', title: 'Asignar cajero', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/admin/drawers/movements', title: 'Movimientos de caja', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      // { path: '/admin/drawers/boxcut', title: 'Cortes de caja', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
  // {
  //   path: '/admin/buys', title: 'Compras', icon: 'bx bx-credit-card-front', class: '', badge: '', badgeClass: '', isExternalLink: false,
  //   submenu: []
  // },
  // {
  //   path: '', title: 'Ventas', icon: 'bx bx-money', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
  //   submenu: [
  //     // { path: '/application/email-app', title: 'Nueva venta', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  //     // { path: '/application/chat-box', title: 'Ordenes de venta', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  //   ]
  // },
  // {
  //   path: '', title: 'Taller de celulares', icon: 'bx bx-test-tube', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
  //   submenu: [
  //     // { path: '/application/email-app', title: 'Nuevo servicio', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  //     // { path: '/application/chat-box', title: 'Ordenes de servicio', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  //   ]
  // },
  {
    path: '', title: 'Altas', icon: 'bx bx-pencil', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
      { path: '/admin/records/provider', title: 'Proveedores', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/admin/records/employee', title: 'Empleados', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/admin/records/client', title: 'Clientes', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/admin/records/branchoffice', title: 'Sucursales', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
  // {
  //   path: '', title: 'Catalogos', icon: 'bx bx-windows', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
  //   submenu: [
  //     { path: '/admin/catalogues/paymentmethod', title: 'Métodos de pago', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  //     { path: '/admin/catalogues/condition', title: 'Condiciones', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  //     { path: '/admin/catalogues/repairservice', title: 'Servicios de taller', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  //     { path: '/admin/catalogues/trouble', title: 'Problemas', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  //     { path: '/admin/catalogues/brand', title: 'Marcas', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  //     { path: '/admin/catalogues/device', title: 'Dispositivos', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  //     { path: '/admin/catalogues/returntype', title: 'Tipo de devolución', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  //   ]
  // },
  {
    path: '', title: 'Inventario', icon: 'bx bx-file', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
      { path: '/admin/inventory/register',    title: 'Registro',          icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/admin/inventory/input',       title: 'Entrada/Salida',    icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/admin/inventory/transfer',    title: 'Traspaso',          icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/admin/inventory/re-entry',    title: 'Reingreso',         icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/admin/inventory/orders',      title: 'Pedidos',           icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/admin/inventory/lines',       title: 'Inv x Linea',       icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/admin/inventory/tags',        title: 'Etiquetas',         icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
  {
    path: '', title: 'Artículos', icon: 'bx bx-list-ol', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
      { path: '/admin/items/item', title: 'Productos', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/admin/items/category', title: 'Líneas', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
  {
    path: '', title: 'Almacén', icon: 'lni lni-shopping-basket', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
      { path: '/pos/warehouse', title: 'Entregas',  icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
    ]
  },
  {
    path: '', title: 'Sistema', icon: 'lni lni-coffee-cup', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
      { path: '/admin/system/goals', title: 'Objectivos Financieros', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/admin/system/notify', title: 'Notificaciones', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/admin/system/config', title: 'Configuración', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },

];