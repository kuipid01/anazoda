const { neon } = require('@neondatabase/serverless');

async function main() {
  const sql = neon(process.env.DATABASE_URL);
  
  try {
    await sql`ALTER TABLE looks ADD COLUMN images JSONB NOT NULL DEFAULT '[]'::jsonb`;
    console.log("Added images column");
  } catch (e) { console.log(e.message); }

  try {
    await sql`ALTER TABLE looks DROP COLUMN image_url`;
    console.log("Dropped image_url");
  } catch (e) { console.log(e.message); }

  try {
    await sql`ALTER TABLE looks DROP COLUMN image_public_id`;
    console.log("Dropped image_public_id");
  } catch (e) { console.log(e.message); }
}

main();
