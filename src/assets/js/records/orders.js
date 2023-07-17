$(function () {
  "use strict";

  $(document).ready(function () {
    $('#Orders').DataTable(
      {
        lengthMenu: [[6, 10, 20, -1], [6, 10, 20, 'Todos']],
        pageLength: 10,
        order: [[0, 'desc']],
        language: {
          url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json',
          search: "_INPUT_",
          searchPlaceholder: "Buscar Cotización"
        },
        columnDefs: [
          {
            targets: [7, 8, 9],
            className: 'dt-right'
          },
          {
            searchable: true,
            targets: [0,1]
          },
          {
            searchable: false,
            targets: [2,3,4,5,6,7,8]
          },
        ],
        initComplete : function() {
          $("#Orders_filter").detach().appendTo('#search-area');
        }
      }
    );
  })
});
