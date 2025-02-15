/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  // create trigger
  const trigger_function = `
    CREATE OR REPLACE FUNCTION update_album_count()
    RETURNS TRIGGER AS $$
    BEGIN
      UPDATE artist
      SET no_of_albums_released = (
        SELECT COUNT(DISTINCT album_name)
        FROM music
        WHERE artist_id = NEW.artist_id
      )
      WHERE id = NEW.artist_id;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;


    CREATE OR REPLACE FUNCTION update_album_count_on_delete()
    RETURNS TRIGGER AS $$
    BEGIN
      UPDATE artist
      SET no_of_albums_released = (
        SELECT COUNT(DISTINCT album_name)
        FROM music
        WHERE artist_id = OLD.artist_id
      )
      WHERE id = OLD.artist_id;

      RETURN OLD;
    END;
    $$ LANGUAGE plpgsql;
    
  `


  await knex.raw(trigger_function)

  const sql_trigger = `
    CREATE TRIGGER trigger_update_album_count
    AFTER INSERT OR UPDATE ON music
    FOR EACH ROW EXECUTE FUNCTION update_album_count();

    CREATE TRIGGER trigger_update_album_count_on_delete
    AFTER DELETE ON music
    FOR EACH ROW EXECUTE FUNCTION update_album_count_on_delete();
  `

  await knex.raw(sql_trigger)

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {

  const sql_trigger = `
    DROP TRIGGER IF EXISTS trigger_update_album_count ON music;
    DROP TRIGGER IF EXISTS trigger_update_album_count_on_delete ON MUSIC;
  `
  await knex.raw(sql_trigger)

  const sql_trigger_function = `
    DROP FUNCTION IF EXISTS trigger_update_album_count();
    DROP FUNCTION IF EXISTS update_album_count_on_delete();
  `
  await knex.raw(sql_trigger_function)
  
};
