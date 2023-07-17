$(function () {
  "use strict";

  $(document).ready(function () {
    $('#ProviderTable').DataTable(
      {
        responsive: true,
        lengthMenu: [[10, 20, -1], [10, 20, 'Todos']],
        language: {
          url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json',
          search: "_INPUT_",
          searchPlaceholder: "Buscar Proveedor"
        },
        columnDefs: [
          {
            targets: [3, 4, 5],
            className: 'dt-right'
          }
        ],
        initComplete : function() {
          $("#ProviderTable_filter").detach().appendTo('#search-area');
        }
      });

      $('#ProviderTable tbody').on('click', 'tr', function () {
        var table = $('#ProviderTable').DataTable();
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
      })
    
      $('#ProviderTable').on('click', '.remove', function () {
      var table = $('#ProviderTable').DataTable();
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