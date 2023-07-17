$(function () {
  "use strict";

  $(document).ready(function () {
    $('#BrandsTable').DataTable(
      {
        responsive: true,
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
      });

    $('#BrandsTable').on('click', '.remove', function () {
      var table = $('#BrandsTable').DataTable();
      var row = $(this).parents('tr');

      if ($(row).hasClass('child')) {
        table.row($(row).prev('tr')).remove().draw();
      }
      else {
        table
          .row($(this).parents('tr'))
          .remove()
          .draw();
      }
    });

  });

});