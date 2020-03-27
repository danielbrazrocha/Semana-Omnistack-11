
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table) {
      /* increments é usado para criar numeracao sequencial de cada caso. Ela não poderia ser usada na tabela de ONG pois seria fácil uma ong visualizar o número da outra*/
    
      table.increments();
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.decimal('value').notNullable();
      /* Referencia a tabela ong_id, na tabela de ONG*/
      table.string('ong_id').notNullable();
      table.foreign('ong_id').references('id').inTable('ongs');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('incidents'); 
  };
  