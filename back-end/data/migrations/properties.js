exports.up = function(knex, Promise) {
	return knex.schema.createTable('properties', (table) => {
		table.increments();
		table.integer('owner').notNullable().references('id').inTable('users');
		table.integer('tenant1').noteNullable().references('id').inTable('users');
		table.integer('tenant2').references('id').inTable('users');
		table.string('address').noteNullable();
		table.integer('maxOccupants').notNullable().defaultTo(2);
		table.integer('sqft').notNullable();
		table.integer('bedrooms').notNullable();
		table.integer('bathrooms').notNullable();
		table.integer('yearBuilt').notNullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('properties');
};
