$(function () {
    "use strict";
  
    $(document).ready(function () {
      $('#ProductTable').DataTable(
        {
          lengthMenu: [[6, 10, 20, -1], [6, 10, 20, 'Todos']],
          language: {
            url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json'
          },
          columnDefs: [
            {
              targets: -1,
              className: 'dt-right'
            }
          ]
        }
      );
    });
  
  });